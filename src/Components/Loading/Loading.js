import React from 'react'
import {makeStyles} from '@material-ui/core'
import loading from './loading.svg'
const useStyles=makeStyles((theme)=>({
    root:{
        width:'100%',
        height:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }
}))
export default function Loading() {
    const style=useStyles()
    return (
        <div className={style.root}>
            <img src={loading} alt="loading icon"></img>
        </div>
    )
}
