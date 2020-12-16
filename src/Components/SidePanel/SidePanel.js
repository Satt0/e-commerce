import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useSelector, useDispatch } from "react-redux";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "auto",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  landscape: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "no-wrap",
    overflow: "scroll",
  },
}));

export default function CheckboxList() {
  const tag = [
    { tag: "all", name: "all" },
    { tag: "beauties", name: "beauty" },
    { tag: "electronics", name: "electronic" },
    { tag: "ultilities", name: "ulti" },
    { tag: "accessories", name: "access" },
    // { tag: "hat", name: "non" },
    // { tag: "petWeapon", name: "vk pet" },
    // { tag: "custom", name: "custom" },
  ];
  // const items = useSelector((state) => state.items);
  const matches = useMediaQuery("(orientation:portrait)");

  const classes = useStyles();

  const checked = useSelector((state) => state.sort.view);

  const dispatch = useDispatch();
  const handleToggle = (value) => async () => {
    dispatch({ type: "setSort", payload: { view: value.tag} });
  };

  return (
    <List className={!matches ? classes.root : classes.landscape}>
      
      {tag.map((value, index) => {
        const labelId = `checkbox-list-label-${value.name}`;

        return (
          <ListItem
            key={index}
            role={undefined}
            dense
            button
            onClick={handleToggle(value)}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                label="secondary"
                checked={checked === value.tag}
                tabIndex={-1}
                disableRipple
                inputProps={{ "aria-labelledby": labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={value.name} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="comments"></IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}
