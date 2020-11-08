// const url = "http://localhost:4000";
// const url='http://192.168.1.8:4000'
const url =true? "https://lit-stream-93368.herokuapp.com":"http://localhost:4000";
export { url };
const API = {
  async getItemByName(name) {
    name = name.split(" ").join("+");
    return await fetch(`${url}/item/name/${name}`, { method: "GET" })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
        }
      })
      .then((res) => {
        if (res) return res.item;
        else return [];
      });
  },
  async getAll() {
    return await fetch(`${url}/item`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return [];
        }
      })
      .then((res) => {
        return res.items;
      });
  },
  async getByTag(tag) {
    return await fetch(`${url}/item/tag/${tag}`, { method: "GET" })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
        }
      })
      .then((res) => {
        if (res) {
          return res.items;
        } else {
          return [];
        }
      });
  },
  async SignUp(infor) {
    return await fetch(`${url}/user/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ signup: infor }),
    }).then((res) => res.json());
  },
  async SignIn(infor) {
    return await fetch(`${url}/user/signin`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(infor),
    }).then((res) => res.json());
  },
  async getInfor() {
    return await fetch(`${url}/user/userid`, { credentials: "include" }).then(
      (res) => {
        if (res.ok) {
          return res.json();
        } else {
        }
      }
    );
  },
  async logOut() {
    return await fetch(`${url}/user/logout`, { credentials: "include" }).then(
      (res) => {
        if (res.ok) {
          return res.json();
        } else {
        }
      }
    );
  },
  async transaction(userId) {
    return await fetch(`${url}/user/transaction`, {
      credentials: "include",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userId }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
      }
    });
  },
  async commitTransaction(cart, id, userId) {
    return await fetch(`${url}/user/transaction/${id}`, {
      credentials: "include",
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart: cart, id: userId }),
    }).then((res) => {
      try {
        if (res.ok) {
          return res.json();
        }
      } catch (err) {}
    });
  },
  async getHistory(userId) {
    return await fetch(`${url}/user/history`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userId }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else return [];
    });
  },
};

export default API;
