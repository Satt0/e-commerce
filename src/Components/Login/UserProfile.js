import React,{useState,useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import cookie from 'react-cookies'
import API from '../../API'
export default function UserProfile() {
    const dispatch = useDispatch();
    const userid=useSelector(state=>state.user.id);
    const [data,setData]=useState('');
    const id=useSelector(state=>state.user.id)
    const onLogout=()=>{
        cookie.remove('id',{path:'/'})
        dispatch({type:'logOut'});
    }
    useEffect(()=>{
        API.getInfor(userid).then(res=>{
            console.log(res);
            setData(res.user)
        })       
    },[])
    return (
        <div className="UserProfile">
            <button onClick={onLogout}>{id} {data}</button>
        </div>
    )
}
