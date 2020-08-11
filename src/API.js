

const url = "http://localhost:4000";
// const url='https://lit-stream-93368.herokuapp.com';


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
       if (res)
       return res.item
       else return []
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
      console.log('hể');
     return res.items
    });
  },
  async getByTag(tag){
    return await fetch(`${url}/item/tag/${tag}`, { method: "GET" })
    .then((res) => {
      if (res.ok) {
      
        return res.json();
      } else {
        console.log("res undefinded");
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
  },
  async SignUp(infor){
    return await fetch(`${url}/user/signup`,{method:'POST',headers:{'Content-Type': 'application/json'},body:JSON.stringify({signup:infor})}).then(res=>res.json())
  },
  async SignIn(infor){
    return await fetch(`${url}/user/signin`,{method:'POST',headers:{'Content-Type': 'application/json'},body:JSON.stringify(infor)}).then(res=>res.json())
  }
  ,
  async getInfor(id){
    return await fetch(`${url}/user/user/${id}`).then(res=>{
      if(res.ok){
        return res.json()
      }
      else{
        console.log('failed to fetch user data');
      }
    })
  }
};

export default API;
