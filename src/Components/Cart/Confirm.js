import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
      width:'100%',
      height:'90vh',
    display: 'flex',
    justifyContent:"center",
    alignItems:"center",
    '& > svg': {
        width:'40%',
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function Confirm({makeDeal}) {
  const classes = useStyles();
useEffect(() => {
makeDeal()
  
}, [])
  return (
    <div className={classes.root}>
      <CircularProgress />
      
    </div>
  );
}