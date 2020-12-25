export default {
    currencyConvert:(str)=>{
        str=str.toString()

        let index = str.length;
        while (index > 3) {
          str = str.slice(0, index - 3) + "." + str.slice(index - 3)
             
          index -= 3;
        }
        return str;
   
          
    }
}