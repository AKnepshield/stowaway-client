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
