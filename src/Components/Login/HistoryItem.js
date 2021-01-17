import React, { useState } from "react";
// import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import nextId from "react-id-generator";

import { useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
// import Container from '@material-ui/core/Container'
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ulti from "ultilities/ulti";

const useRowStyles = makeStyles({
  root: {
    overflow: "hidden",
    "& > *": {
      borderBottom: "unset",
    },
  },
  inlineBlock: {
    padding: 0,
    minWidth: 270,
    "& > p": {
      display: "inline-block",
    },
  },
  pagination: {
    width: "100%",
   
    " & > .MuiTablePagination-root": {
      width: "100%",
    },
  },
});

function Row({ row }) {
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell component="th" scope="row" className={classes.inlineBlock}>
          <IconButton onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          <p>{row.data.substring(0, 24)}</p>
        </TableCell>
        <TableCell align="right">ok</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.cart.map((item) => (
                    <TableRow key={nextId()}>
                      <TableCell component="th" scope="row">
                        {item.name}
                      </TableCell>
                      <TableCell>
                        {ulti.currencyConvert(item.price.toString())}
                      </TableCell>
                      <TableCell align="right">{item.thisQuantity}</TableCell>
                      <TableCell align="right">
                        {ulti.currencyConvert(item.thisQuantity * parseInt(item.price))}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell>
                      <strong>Total</strong>
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell align="right">
                      <strong>
                        {ulti.reduceTotal(row.cart,'count')}
                      </strong>
                    </TableCell>
                    <TableCell align='right'>{ulti.currencyConvert(ulti.reduceTotal(row.cart,'money'))}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

export default function HistoryItem() {
  const styles = useRowStyles();
  const [row, setRow] = useState(5);
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState([]);
  const handleChangePage = (e, p) => {
    console.log(p);
    setCurrent((p * row) % data.length);
  };
  const items = useSelector((state) => state.history);

  const handleChangeRowsPerPage = (e) => {
    setRow(e.target.value);
  };


  React.useEffect(() => {
    setData([...items].reverse());
  }, [items]);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" className={styles.root}>
        <TableHead>
          <TableRow>
           
            <TableCell>Date</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .slice(current, Math.min(data.length, current + row))
            .map((row) => (
              <Row key={nextId()} row={row} />
            ))}
        </TableBody> </Table>
        <TablePagination
          rowsPerPageOptions={[3, 5, 10]}
          component="div"
          count={data.length}
          rowsPerPage={row}
          className={styles.pagination}
          page={Math.floor(current / row)}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
     
    </TableContainer>
  );
}
