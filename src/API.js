const API={
    async getItemByName(name){
        name=name.split(' ').join('+');
        return await fetch(`http://localhost:4000/item/name/${name}`,{method:'GET'}).then(res=>{
            if(res.ok){
                return res.json();
            }
            else{
                console.log('failed');
            }
        }).then(res=>{
            console.log(res)
        })
    }
}
export default API;