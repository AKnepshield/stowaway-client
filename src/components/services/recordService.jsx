export const getRecords = () => {
  return fetch(`http://localhost:8000/records`, {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("user_token")).token
      }`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const getRecord = (id) => {
  return fetch(`http://localhost:8000/records/${id}`, {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("user_token")).token
      }`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const deleteRecord = (id) => {
  return fetch(`http://localhost:8000/records/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("user_token")).token
      }`,
      "Content-Type": "application/json",
    },
  });
};

export const updateRecord = () => {
  return fetch(`http://localhost:8000/records`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("user_token")).token
      }`,
      "Content-Type": "application/json",
    },
  });
};

export const createRecord = (recordObj) => {
  return fetch(`http://localhost:8000/records`, {
    method: "POST",
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("user_token")).token
      }`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recordObj),
  });
};
