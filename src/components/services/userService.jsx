// export const getCurrentUser = () => {
//   return fetch(`http://localhost:8000/current_user`, {
//     headers: {
//       Authorization: `Token ${
//         JSON.parse(localStorage.getItem("user_token")).token
//       }`,
//       "Content-Type": "application/json",
//     },
//   }).then((res) => res.json());
// .then((data) => {
//   if (data.user) {
//     return data.user;
//   } else if (data.data) {
//     return data.data;
//   } else {
//     return data;
//   }
// });
// };
export const getCurrentUser = () => {
  const userToken = JSON.parse(localStorage.getItem("user_token"))?.token;
  if (!userToken) {
    return Promise.reject(new Error("User token not found"));
  }

  return fetch(`http://localhost:8000/current_user`, {
    headers: {
      Authorization: `Token ${userToken}`,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch current user");
    }
    return res.json();
  });
};
