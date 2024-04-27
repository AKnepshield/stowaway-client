export const getGenres = () => {
  return fetch(`http://localhost:8000/genres`, {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("user_token")).token
      }`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};
