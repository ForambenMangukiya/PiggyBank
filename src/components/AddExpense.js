import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./styles/addexpense.css";

import { AuthContext } from "../context/AuthContext";
import { DataContext } from "../context/DataContext";

export default function AddExpense() {
  const [category, setCategory] = React.useState("");
  const [recurrence, setRecurrence] = React.useState("");
  const [date, setDate] = React.useState(null);
  const [description, setDescription] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [alert, setAlert] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(null);

  const { token } = React.useContext(AuthContext);
  const { refresh, setRefresh } = React.useContext(DataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      category === "" ||
      recurrence === "" ||
      date === null ||
      description === "" ||
      amount === ""
    ) {
      setAlert(<Alert severity="warning">Please fill in all the fields</Alert>);
    } else {
      setIsLoading(true);
      try {
        const res = await fetch(
          "https://piggybank-api.onrender.com/transaction/",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              category_name: category,
              tran_description: description,
              tran_amount: amount,
              tran_sign: "DR", //DR (expense) or CR(income)
              tran_currency: "US",
              tran_date: date,
            }),
          }
        );
        setIsLoading(false);
        setCategory("");
        setRecurrence("");
        setDate(null);
        setDescription("");
        setAmount("");
        setAlert(<Alert severity="success">Your expense has been saved</Alert>);
        setRefresh(!refresh);
      } catch (error) {
        setIsLoading(false);
        setAlert(
          <Alert severity="error">
            Couldn't post the transaction, take a look at the console for more
            information about the error!
          </Alert>
        );
        console.log("Here is the Error with more Info:", error);
      }
    }
  };

  return (
      <Container maxWidth="sm" id="transactions-container-id"
        sx={{
          paddingTop: "100px",
        }}
      >
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress sx={{ mt: 2 }} />
          </Box>
        ) : (
          <Box sx={{ minWidth: 120, p: 2 }} className="addexp_box">
            <form>
              {/*Category */}
              <FormControl fullWidth>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  required
                  labelId="category-label"
                  id="category"
                  value={category}
                  label="Category"
                  className="background_grey"
                  onChange={(e) => setCategory(e.target.value)}
                  sx={{ textAlign: "left", borderRadius: "31px" }}
                >
                  <MenuItem value={"education"}>Eduaction</MenuItem>
                  <MenuItem value={"communication"}>Communication</MenuItem>
                  <MenuItem value={"bills"}>Bills</MenuItem>
                  <MenuItem value={"rent"}>Rent</MenuItem>
                  <MenuItem value={"medicine"}>Medicine</MenuItem>
                  <MenuItem value={"groceries"}>Groceries</MenuItem>
                  <MenuItem value={"eatingOut"}>Eating Out</MenuItem>
                  <MenuItem value={"entertainment"}>Entertainment</MenuItem>
                  <MenuItem value={"pets"}>Pets</MenuItem>
                  <MenuItem value={"repairs"}>Repairs</MenuItem>
                  <MenuItem value={"work"}>Work</MenuItem>
                  <MenuItem value={"insurance"}>Insurance</MenuItem>
                  <MenuItem value={"others"}>Others</MenuItem>
                </Select>
              </FormControl>
              {/*Recurrence */}
              <FormControl fullWidth>
                <InputLabel id="recurrence-label">Recurrence</InputLabel>
                <Select
                  required
                  labelId="recurrence-label"
                  id="recurrence"
                  value={recurrence}
                  label="Recurrence"
                  className="background_grey"
                  onChange={(e) => setRecurrence(e.target.value)}
                  sx={{ textAlign: "left", borderRadius: "31px" }}
                >
                  <MenuItem value={"single"}>Single Expense</MenuItem>
                  <MenuItem value={"recurrent"}>Recurrent Expense</MenuItem>
                </Select>
              </FormControl>

              {/*Date*/}
              <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date"
                    className="background_grey"
                    value={date}
                    onChange={(selectedDate) => setDate(selectedDate)}
                    sx={{
                      borderRadius: "31px",
                      "& fieldset": {
                        borderRadius: "30px",
                      },
                    }}
                  />
                </LocalizationProvider>
              </FormControl>

              {/*Description */}
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  label="Description"
                  className="background_grey"
                  variant="outlined"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  sx={{
                    borderRadius: "31px",
                    "& fieldset": {
                      borderRadius: "30px",
                    },
                  }}
                />
              </FormControl>

              {/*Amount */}
              <FormControl fullWidth>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Amount
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  type="number"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  label="Amount"
                  className="background_grey"
                  onChange={(e) => setAmount(e.target.value)}
                  value={amount}
                  sx={{ borderRadius: "31px" }}
                />
              </FormControl>
              {/* Submit Button */}
              <Button
                sx={{
                  ":hover": { bgcolor: "grey" },
                  borderRadius: "31px",
                  background: "#c80048",
                  width: "150px",
                  height: "50px",
                  margin: "20px",
                  color: "white",
                }}
                onClick={handleSubmit}
              >
                ADD
              </Button>
              {/* Alert Message */}
              <Box sx={{ mt: 1 }}>{alert}</Box>
            </form>
          </Box>
        )}
      </Container>
  );
}
