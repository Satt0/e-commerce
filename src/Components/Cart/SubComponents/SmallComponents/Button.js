import React,{useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Timer from './Timer'
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent:"center",
    [theme.breakpoints.down('sm')]:{
      justifyContent:'flex-start',
      transform:"translateX(-5%)"
      
    }
  },
  wrapper: {
    marginRight:"2%",
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function Checker({action}) {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  // const timer = React.useRef();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  // React.useEffect(() => {
  //   return () => {
  //     clearTimeout(timer.current);
  //   };
  // }, []);

  useEffect(()=>{
      const a=setTimeout(()=>{
        setSuccess(false);
      },3000)
      return ()=>{
        clearTimeout(a)
      }
  },[success])
  const handleButtonClick = () => {
    if(!success)
    {
    
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      action().then(res=>{
          
        if(res.ok===true)
        {
           setSuccess(true);
           setLoading(false);
        }
        else{
          setLoading(false)
        }
       
    })
     }
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Fab
          aria-label="save"
          color="primary"
          className={buttonClassname}
          onClick={handleButtonClick}
        >
          {success ? <CheckIcon /> : <ShoppingCartIcon />}
        </Fab>
        {loading && <CircularProgress size={68} className={classes.fabProgress} />}
      </div>
      <div className={classes.wrapper}>
        <Button
          variant="contained"
          color="primary"
          className={buttonClassname}
          disabled={loading}
          onClick={handleButtonClick}
        >
          {success?<span>Success (<Timer/>)</span>:"Checkout"}
        </Button>
        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
    </div>
  );
}
