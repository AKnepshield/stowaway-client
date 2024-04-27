export const getConditions = () => {
  return fetch(`http://localhost:8000/conditions`, {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("user_token")).token
      }`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};
