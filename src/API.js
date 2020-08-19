const url = "http://localhost:4000";
// const url = "https://lit-stream-93368.herokuapp.com";

const API = {
  async getItemByName(name) {
    name = name.split(" ").join("+");
    return await fetch(`${url}/item/name/${name}`, { method: "GET" })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log("failed");
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
          console.log("failed to fetch user data");
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
          console.log("failed to fetch user data");
        }
      }
    );
  },
  async transaction() {
    return await fetch(`${url}/user/transaction`, {
      credentials: "include",
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        console.log("failed to fetch user data");
      }
    });
  },
  async commitTransaction(cart, id) {
    return await fetch(`${url}/user/transaction/${id}`, {
      credentials: "include",
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart: cart }),
    }).then((res) => {
      try {
        if (res.ok) {
          return res.json();
        }
      } catch (err) {
        console.log(err.message);
      }
    });
  },
};

export default API;
