import React,{useEffect} from 'react';
import clsx from 'clsx';
import {useSelector} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Timer from './Timer'
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
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
    whiteSpace:'nowrap',
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
  typography:{
    padding:15
  }
}));

export default function Checker({action}) {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const checker=useSelector(state=>state.items).some(e=>e.cart)
  const handleClick = (event) => {
   if(!success && !checker)
   {
    setAnchorEl(event.currentTarget);
   }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
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
      <div className={classes.wrapper}  aria-describedby={id} onClick={handleClick}>
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
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.typography}>The Cart is EMPTY!!!</Typography>
      </Popover>
    </div>
  );
}
