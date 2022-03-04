import React, { useEffect } from "react";
import "../App.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Tooltip from "@mui/material/Tooltip";
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
import ListItemText from "@mui/material/ListItemText";
import Pdf from "react-to-pdf";
import PrintIcon from "@mui/icons-material/Print";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Todo = () => {
  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState("");
  const [data, setData] = useState([]);
  const [globalIndex, setGlobalIndex] = useState("");
  const [disable, setDisable] = useState(false);
  const [updateButton, setUpdataButton] = useState(false);
  const [disbaleBtnForPdf, setDisbaleBtnForPdf] = useState(false);
  const [number, setRandomNumber] = useState(0);
  //mui state
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const ref = React.createRef();

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
  const options = {
    orientation: "landscape",
    unit: "in",
    format: [4, 2],
    x1: "0", //starting coords are x1 and y1
    y1: "0",
    x2: "2", //ending coords:
    y2: "20",
  };
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
  let randomNum = Math.ceil(Math.random() * 100);
  // setRandomNumber(randomNum)
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div id="changing" ref={ref}>
              <h3 id="invioceid">{"INVOICE"}</h3>
              {/* <p id="invoicenumber">id:{randomNum}</p> */}
              <table id="tableWidtth">
                <tr>
                  <th>NAME</th>
                  <th>PRICE</th>
                </tr>
                {Array.isArray(data) &&
                  data.length > 0 &&
                  data.map((printval, ind) => {
                    return (
                      <>
                        <tr>
                          <td>{printval.charge}</td>
                          <td>{printval.amount}</td>
                        </tr>
                      </>
                    );
                  })}
              </table>
            </div>
          </Typography>
          <Pdf
            targetRef={ref}
            filename="Invoice.pdf"
            x={50}
            y={10}
            x1={10}
            scale={0.8}
          >
            {({ toPdf }) => (
              <Tooltip title="Print" arrow>
                <div id="printericonbtn">
                  <Button
                  variant="contained"
                    id="printbtn"
                    startIcon={<PrintIcon />}
                    onClick={toPdf}
                  >
                    PRINT
                  </Button>
                </div>
              </Tooltip>
            )}
          </Pdf>
        </Box>
      </Modal>

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
          {/* for pdf */}
          {/* <div id="changing" ref={ref}> */}
          {/* <"show Array data"> */}
          {Array.isArray(data) &&
            data.length > 0 &&
            data.map((val, index) => {
              return (
                <>
                  <div id="mylist">
                    <List
                      key={index}
                      sx={{
                        width: "100%",
                        //   maxWidth: 390,
                        bgcolor: "background.paper",
                        colr: "black",
                      }}
                    >
                      <ListItem
                        key={index}
                        secondaryAction={
                          <Stack direction="row" spacing={2}>
                            <>
                              <Tooltip title="Edit" arrow>
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
                              </Tooltip>
                              {/* delete btn */}
                              <Tooltip title="Delete" arrow>
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
                              </Tooltip>
                            </>
                          </Stack>
                        }
                        //   disablePadding
                      >
                        <ListItemButton>
                          <ListItemText primary={index + 1}></ListItemText>
                          <ListItemText
                            primary={
                              <Typography
                                gutterBottom
                                variant="h6"
                                component="h6"
                              >
                                {val.charge}
                              </Typography>
                            }
                          />
                          <ListItemText
                            primary={
                              <Typography
                                gutterBottom
                                variant="h6"
                                component="h6"
                              >
                                ${val.amount}
                              </Typography>
                            }
                          />
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </div>
                </>
              );
            })}
        </div>
        <div id="dltbtn">
          {data.length > 0 ? (
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                onClick={deleteAllData}
                startIcon={<DeleteIcon />}
              >
                Clear
              </Button>{" "}
              <Button variant="contained" onClick={handleOpen}>
                Print
              </Button>
            </Stack>
          ) : (
            ""
          )}
        </div>
      </div>
      <div id="totalAmount">
        <b>{data.length > 0 ? `Total Spend $${totalAmount}` : ""}</b>
      </div>
      {/* </div> */}
    </>
  );
};
export default Todo;
