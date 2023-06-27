import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Container from "@mui/material/Container";
import ScanReceipt from "./svg/IconScanReciept";
import LinkAccount from "./svg/IconPayWithCard";
import ManualEntry from "./svg/IconManuallyEnter";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

import { useState, useEffect, useContext } from "react";
import { MenuItem, InputLabel, Alert, OutlinedInput } from "@mui/material";

import { DataContext } from "../context/DataContext";
import { AuthContext } from "../context/AuthContext";
import "./styles/transactions.css";

const actions = [
  { icon: <LinkAccount />, name: "Link", route: "/link" },
  { icon: <ManualEntry />, name: "Expense", route: "/addexpense" },
  { icon: <ManualEntry />, name: "Income", route: "/addincome" },
  { icon: <ScanReceipt />, name: "Scan", route: "/" },
];

export default function Transactions() {
  //state
  const [transaction, setTransaction] = useState("expenses");
  const [filter, setFilter] = useState("");
  const [category_name, setCatgeroy] = useState("");
  const [income, setIncome] = useState(null);
  const [expenses, setExpenses] = useState(null);
  const [open, setOpen] = useState(false);

  //context
  const { tranData } = useContext(DataContext);
  const { token } = useContext(AuthContext);
  console.log(tranData);

  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleActionClick = (route) => {
    navigate(route);
    handleClose();
  };

  //transactions functions
  const handleChange = (event, newValue) => {
    setTransaction(newValue);
  };
  const handleCategoryChange = (event) => {
    setCatgeroy(event.target.value);
  };

  const paperStyles = {
    // Customize the background color here
    background: "linear-gradient(#c80048, #961c48)",
  };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     setIsLoading(true);
  //     setError(null);

  useEffect(() => {
    //logic for creating two state variables once the transaction data is fetched, one for income and one for expense
  }, []);
  console.log(typeof tranData);
  return (
    <Container maxWidth="sm">
      <Tabs value={transaction} onChange={handleChange} centered>
        <Tab label="expenses" value="expenses" />
        <Tab label="income" value="income" />
      </Tabs>
      {/* Expenses */}
      {transaction === "expenses" && (
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              ml: 0.5,
            }}
          >
            <Typography sx={{ fontWeight: "bold", mb: 1 }}>Spent</Typography>
          </Box>
          {tranData?.map((element) => (
            <Box
              component="div"
              className="transaction-div"
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Typography
                variant="p"
                component="p"
                className="transaction-item"
                sx={{ fontWeight: "bold" }}
              >
                {element.tran_amount}
              </Typography>
              <Typography
                variant="p"
                component="p"
                className="transaction-item"
              >
                {element.category_name}
              </Typography>
              <Typography
                variant="p"
                component="p"
                className="transaction-item"
              >
                {element.tran_date}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
      {/* Income */}
      {transaction === "income" && (
        <Box>
          <FormControl fullWidth>
            <InputLabel id="category-label">Filter by Category</InputLabel>

            <Select
              required
              className="addincome-textfield"
              label="Filter by Category "
              value={category_name}
              onChange={handleCategoryChange}
              sx={{ textAlign: "left", borderRadius: "31px" }}
            >
              <MenuItem value="Salary">salary </MenuItem>
              <MenuItem value="Deposits"> Deposits</MenuItem>
              <MenuItem value="Savings"> Savings</MenuItem>
              <MenuItem value="Others"> Others</MenuItem>
            </Select>
          </FormControl>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              ml: 0.5,
            }}
          >
            <Typography sx={{ fontWeight: "bold", mb: 1 }}>Spent</Typography>
          </Box>
          {tranData?.map((element) => (
            <Box
              component="div"
              className="transaction-div"
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                borderRadius: "31px",
                background: "grey",
              }}
            >
              <Typography
                variant="p"
                component="p"
                className="transaction-item"
                sx={{ fontWeight: "bold" }}
              >
                {element.tran_amount}
              </Typography>
              <Typography
                variant="p"
                component="p"
                className="transaction-item"
              >
                {element.category_name}
              </Typography>
              <Typography
                variant="p"
                component="p"
                className="transaction-item"
              >
                {element.tran_date}
              </Typography>
            </Box>
          ))}
        </Box>
      )}

      <Box sx={{ height: 330, transform: "translateZ(0px)", flexGrow: 1 }}>
        <Backdrop open={open} />
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          sx={{ position: "absolute", bottom: 16, right: 16 }}
          icon={<SpeedDialIcon sx={{ color: "#FFFF" }} />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          FabProps={{
            style: paperStyles,
          }}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen
              onClick={() => handleActionClick(action.route)}
            />
          ))}
        </SpeedDial>
      </Box>
    </Container>
  );
}
