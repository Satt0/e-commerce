import React,{useEffect} from 'react'
import {makeStyles} from '@material-ui/core'
import loading from './loading.svg'
import anime from 'animejs/lib/anime.es.js';

const useStyles=makeStyles((theme)=>({
    root:{
        width:'100%',
        height:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        overflow:'hidden'
    },
    loading:{
        position:'absolute',
        borderRadius:'100%',
        
        userSelect:'none'
    }
}))
export default function Loading() {
    const style=useStyles()


   
    
    return (
        <div className={style.root}>
            <img className={style.loading} src={loading} alt="loading icon"></img>
           
           
        </div>
    )
}
