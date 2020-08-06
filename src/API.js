const axios = require('axios').default;
const url = "https://lit-stream-93368.herokuapp.com";
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
        console.log(res);
       return res.item
      });
  },
  async getAll() {
    return await fetch(`${url}/item`, { method: "GET" })
    .then((res) => {
      if (res.ok) {
      
        return res.json();
      } else {
        console.log("failed");
      }
    })
    .then((res) => {
     return res.items
    });
  },
  async getByTag(tag){
    return await fetch(`${url}/item/tag/${tag}`, { method: "GET" })
    .then((res) => {
      if (res.ok) {
      
        return res.json();
      } else {
        console.log("failed");
      }
    })
    .then((res) => {
     
      if(res)
      {
        return res.items;
      }
      else{
        console.log('failed');
        return []
      }
    });
  }
};

export default API;
