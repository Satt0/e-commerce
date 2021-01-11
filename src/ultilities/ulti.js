export default {
    currencyConvert:(str)=>{
     
        str=str.toString()

        let index = str.length;
        while (index > 3) {
          str = str.slice(0, index - 3) + "." + str.slice(index - 3)
             
          index -= 3;
        }
        return str + ' VND'; 
   
          
    },
    generateURL : function(str){
      if(str)
      {
        str=str.split(' ').join('_').toLowerCase()
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
      str = str.replace(/đ/g, "d");
      str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
      str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
      str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
      str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
      str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
      str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
      str = str.replace(/Đ/g, "D");
    }
    return str;

    },
    reduceTotal:(arr,type)=>{
      console.log(type,arr);
      if(arr.length>1)
      {
        if(type==='count')
        {
          return arr.reduce((a,c)=>{
            if(typeof a!== 'number')
            {
              a=a.thisQuantity
            }
            return a + c.thisQuantity;
          })
        }
        else{
          return arr.reduce((a,c)=>{
            if(typeof a!== 'number')
            {
              a=a.thisQuantity * a.price
            }
            return a + c.thisQuantity*c.price;
          })
        }
      }
      else{
          if(type==='count')
          {
            return arr[0].thisQuantity;
          }
          else{
            return arr[0].thisQuantity*arr[0].price
          }
      }

    
    }
}