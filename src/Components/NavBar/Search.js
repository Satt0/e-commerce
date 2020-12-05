import React from 'react'
import {useDispatch} from 'react-redux';
import Button from '../../SmallComponents/Button'
export default function Search(props) {
    // const dispatch = useDispatch();
    const refInput=React.createRef();
   const dispatch = useDispatch();
    function onSubmit(e){
        e.preventDefault();
        // API.getItemByName(refInput.current.value).then(items=>{
        //   dispatch({type:'searchItem',payload:items})
        // })
        // const options = {
        //   includeScore: false,
        //   minMatchCharLength:Math.max(refInput.current.value.toString().length-2,1),
        //   keys: [
        //     'name'
        //   ]
        // }
        
        // // Create a new instance of Fuse
        // const fuse = new Fuse(items, options)
        
        // // Now search for 'Man'
        // const result = fuse.search(refInput.current.value.toString())
        
        dispatch({type:'searchItem',payload:refInput.current.value.toString()})
    }
    return (
     
        <form
          autoComplete="off"
          className={props.visibility ? "show" : "hide"}
          onSubmit={onSubmit}
        >
          
          <input
            id="search"
            type="text"
            required
            placeholder="search for item"
            className="input"
            ref={refInput}
          />
          {/* <input id="btn" type="submit" value="Search" className="input" /> */}
          <Button theme={{width:'90px',height:'30px',color:'red'}}  title="search" />
        </form>

 )
}
