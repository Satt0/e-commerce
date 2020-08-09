import React from 'react'
import {useDispatch} from 'react-redux';
import API from '../../API'
export default function Search(props) {
    const dispatch = useDispatch();
    const refInput=React.createRef();
    function onSubmit(e){
        e.preventDefault();
        console.log(refInput.current.value);
        API.getItemByName(refInput.current.value.trim()).then(res=>{
            dispatch({type:'updateItem',payload:res})
        })
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
          <input id="btn" type="submit" value="Search" className="input" />
        </form>
    )
}
