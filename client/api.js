const API_HOST = "http://travis-p50.local:5000";

const post = async (url, token, payload) => {
  try {
    const resp = await fetch(API_HOST + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
        "api-token": token
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
const get = async (url, token) => {
  try {
    const resp = await fetch(API_HOST + url, {
      method: "GET",
      headers: {
        Accepts: "application/json",
        "api-token": token
      }
    });
    const data = await resp.json();
    return data;
  } catch (err) {
    console.log("couldnt fetch " + err);
    return null;
  }
};
const api = {
  createUser: async ({ name, email, password }) => {
    return await post("/api/v1/users/", "", {
      name,
      email,
      password
    });
  },
  createEvent: async ({ token, title, date, description, location }) => {
    return await post("/api/v1/events/", token, {
      title,
      date,
      description,
      location
    });
  },
  getEvents: async token => {
    return await get("/api/v1/events/me", token);
  },
  getEvent: async id => {
    return await get(`/api/v1/events/${id}`, "");
  }
};

export default api;
