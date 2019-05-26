const API_HOST = "http://travis-p50.local:5000";

const post = async (url, payload) => {
  try {
    const resp = await fetch(API_HOST + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify(payload)
    });
    const data = await resp.json();
    return data;
  } catch (err) {
    console.log("couldnt fetch " + err);
    return null;
  }
};
const api = {
  createUser: async ({ name, email, password }) =>
    post("/api/v1/users/", {
      name,
      email,
      password
    })
};

export default api;
