import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button'
import {
  Input,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,

    [theme.breakpoints.down("sm")]: {
      width: "100vw",
    },
  },
  container: {
    minWidth: "270px",
    width: "100%",
    marginTop: "20px",
    marginLeft:'20px',
    height: "400px",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    '& > button':{
      width:'60%',
      margin:'0 auto',
      transform:'translateX(-20px)'
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "row",
      justifyContent: "center",
      height: "auto",
      marginLeft:0,
    },
  },
  formControls: {
    margin: theme.spacing(1),
    display: "flex",
    width: "80%",
    maxWidth: 400,
  },
}));

export default function CheckboxList() {
  const tag = [
    { tag: "all", name: "all", spec: ["all"] },
    {
      tag: "beauties",
      name: "beauties",
      spec: ["all", "cream", "liquid", "wax", "spray"],
    },
    {
      tag: "electronics",
      name: "electronics",
      spec: ["all", "phone", "laptop", "tablet", "watch"],
    },
    {
      tag: "ultilities",
      name: "ultilities",
      spec: ["all", "cleaning", "cooking", "hairing"],
    },
    {
      tag: "accessories",
      name: "accessories",
      spec: ["all", "cable", "charger", "headphone", "battery"],
    },
  ];

  // const items = useSelector((state) => state.items);
  const [catergory, changeCatergory] = useState("all");
  const [specific, changeSpecific] = useState("all");
  const classes = useStyles();
  const sort=useSelector(state=>state.sort.view)
  const dispatch = useDispatch();
 
  const handlechange = (type) => {
    if (type === "catergory") {
      return (e) => {
        
        const value = e.target.value.toString();
        if (value) {
          changeCatergory(value);
        }
      };
    } else {
      return (e) => {
        const value = e.target.value.toString();
        if (value) {
          changeSpecific(value);
        }
      };
    }
  };
  const clearSearch=()=>{
    dispatch({type:'sort/setSort',payload:{view:'all'}})
  }

  useEffect(() => {
    changeSpecific("all");
  }, [catergory]);
  useEffect(() => {
    const handleToggle = (value, specific = "") => {
      dispatch({ type: "sort/setSort", payload: { view: value, specific: specific } });
    };
    handleToggle(catergory, specific);
  }, [catergory, specific,dispatch]);
  return (
    <div className={classes.root}>
     
      <form className={classes.container} onSubmit={(e)=>{e.preventDefault()}}>
      {sort==='custom'?<Button variant="contained" color="primary"  onClick={clearSearch}>clear search</Button>:(
        <>
        <FormControl className={classes.formControls}>
          <InputLabel htmlFor="demo-dialog-native">Select Catergory</InputLabel>
          <Select
            value={catergory}
            onChange={handlechange("catergory")}
            input={<Input id="demo-dialog-native" />}
            >
            
            {tag.map((e, i) => (
              <MenuItem key={i * 123} value={e.tag}>
                {e.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControls}>
          <InputLabel id="demo-dialog-select-label">Select Specific</InputLabel>
          <Select
            labelId="demo-dialog-select-label"
            id="demo-dialog-select"
            value={specific}
            onChange={handlechange("else")}
            input={<Input />}
            >
            {tag
              .filter((e) => e.tag === catergory)[0]
              .spec.map((e, i) => (
                <MenuItem key={i * 1233} value={e}>
                  {e}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
                </>
      )}
      </form>
    </div>
  );
}
