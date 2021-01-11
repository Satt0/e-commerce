import React from 'react'
import {makeStyles} from '@material-ui/core'
import Checker from "./SmallComponents/Button"
import {useHistory} from 'react-router-dom'
const useStyles=makeStyles((theme)=>({
    root:{
        
        width:'100%',
        height:'50%',
        display:'flex',
        justifyContent:"center",
        alignItems:"center",
        [theme.breakpoints.down('sm')]:{
            height:'100%',
            width:'50%',
        }
    },
    // buttonContainer:{
      
     
    //     // minWidth:100,
    //     overflow:"visible",
      
        
  
    // }
}))
export default function Checkout({action}) {
    // const url=useHistory()
    const styles=useStyles()

    return (
        <div className={styles.root}>
            {/* <div className={styles.buttonContainer}> */}

            <Checker action={action} />
            {/* </div> */}
        </div>
    )
}
