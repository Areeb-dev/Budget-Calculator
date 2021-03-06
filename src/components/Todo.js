import React, { useEffect } from "react";
import "../App.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const Todo = () => {
  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState("");
  const [data, setData] = useState([]);
  const [globalIndex, setGlobalIndex] = useState("");
  const [disable, setDisable] = useState(false);
  const [updateButton, setUpdataButton] = useState(false);

  function submitData(e) {
    e.preventDefault();
    setDisable(false);
    setTotalAmount(amount);
    setAmount("");
    setCharge("");
    if (!charge === "" || !amount == "") {
      if (!isNaN(amount) && isNaN(charge)) {
        let objs = { amount: amount, charge: charge };
        setData(data.concat([objs]));
      } else {
        alert("Please enter Feilds Correctly");
      }
    } else {
      alert("Please Fill Input Fields");
    }
  }

  //TOTAL AMOUNT
  const totalSpend = data
    .map((item) => +item.amount)
    .reduce((prev, curr) => prev + curr, 0);

  useEffect(() => {
    setTotalAmount(totalSpend);
  }, [totalSpend]);

  function editItem(e) {
    setDisable(true);
    setUpdataButton(true);
    setCharge(data[e].charge);
    setAmount(data[e].amount);
  }

  function updateButtonFunction() {
    setUpdataButton(false);
    data[globalIndex].charge = charge;
    data[globalIndex].amount = amount;
    setAmount("");
    setCharge("");
    setDisable(false);
  }
  function cancelButtonFunction() {
    setAmount("");
    setCharge("");
    setDisable(false);
    setUpdataButton(false);
  }
  function deleteitem(e) {
    const filterdeleteItem = data.filter((val, ind) => {
      return e != ind;
    });
    setData(filterdeleteItem);
  }
  function deleteAllData() {
    setData([]);
    setDisable(false);
    setUpdataButton(false);
    setAmount("");
    setCharge("");
  }
  return (
    <>
      <div id="mainContainer">
        <h1>BUDGET CALCULATOR</h1>
        <div id="inputContainer">
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            {" "}
            <TextField
              fullWidth
              value={charge}
              label="Charge"
              variant="outlined"
              onChange={(e) => {
                setCharge(e.target.value);
              }}
            />
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-amount">
                Amount
              </InputLabel>
              <OutlinedInput
                label="Amount"
                value={amount}
                id="outlined-adornment-amount"
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
              />
            </FormControl>
          </Box>

          <div id="sendbtn">
            {updateButton ? (
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  onClick={updateButtonFunction}
                  endIcon={<SendIcon />}
                >
                  Update
                </Button>

                <Button
                  id="CancelBtn"
                  variant="outlined"
                  onClick={cancelButtonFunction}
                  endIcon={<SendIcon />}
                >
                  Cancel
                </Button>
              </Stack>
            ) : (
              <Button
                onClick={submitData}
                variant="contained"
                endIcon={<SendIcon />}
              >
                Submit
              </Button>
            )}
          </div>

          {/* <"show Array data"> */}
          {Array.isArray(data) &&
            data.length > 0 &&
            data.map((val, index) => {
              return (
                <>
                 
                  <div id="mylist">
                    <List
                      sx={{
                        width: "100%",
                        maxWidth: 360,
                        bgcolor: "background.paper",
                        colr: "black",
                      }}
                    >
                      <ListItem
                      key={index}
                        secondaryAction={
                          <Stack direction="row" spacing={2}>
                            <IconButton
                              edge="end"
                              disabled={disable}
                              onClick={() => {
                                deleteitem(index);
                              }}
                              aria-label="delete"
                            >
                              <DeleteIcon />
                            </IconButton>
                            {/* edit button */}
                            <IconButton
                              edge="end"
                              onClick={() => {
                                editItem(index);
                                setGlobalIndex(index);
                              }}
                              aria-label="edit"
                            >
                              <EditIcon />
                            </IconButton>
                          </Stack>
                        }
                        disablePadding
                      >
                        <ListItemButton role={undefined} dense>
                          <ListItemText primary={val.charge} />
                          <ListItemText primary={val.amount} />
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </div>
                </>
              );
            })}
          {/* </div> */}
          <div id="dltbtn">
            {data.length > 0 ? (
              <Button
                variant="contained"
                onClick={deleteAllData}
                startIcon={<DeleteIcon />}
              >
                Clear Expenses
              </Button>
            ) : (
              ""
            )}
          </div>
        </div>
        <div id="totalAmount">
          <b>{data.length > 0 ? `Total Spend$ ${totalAmount}` : ""}</b>
        </div>
      </div>
    </>
  );
};
export default Todo;
