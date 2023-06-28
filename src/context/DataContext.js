import { useState, useEffect, createContext, useContext } from "react";
import { useJwt } from "react-jwt";
import { AuthContext } from "../context/AuthContext";
import { all } from "axios";

export const DataContext = createContext();

export default function DataContextProvider(props) {
  const [tranData, setTranData] = useState([]);
  const [budgetData, setBudgetData] = useState();
  const [categories, setCategories] = useState([]);
  const [timeperiod, setTimePeriod] = useState("all");
  const [categoriesObj, setCategoriesObj] = useState();

  const { token } = useContext(AuthContext);
  const { decodedToken } = useJwt(token);
  console.log(token);
  console.log("decodedToken:", decodedToken);

  // =============================
  // Fetching Data
  // ============================

  useEffect(() => {
    // getting all transactions for one user within specific period
    const getData = async function () {
      try {
        const res = await fetch(
          `http://localhost:8080/transaction?timeperiod=${timeperiod}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setTranData(data);
        // setLoading(false)
      } catch (error) {
        console.log(error);
        // setLoading(false);
      }
    };

    // getting all budgets for one user
    const getBudget = async function () {
      try {
        const res = await fetch(
          `http://localhost:8080/users/6493080e1fb7f24f9a843cf4`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setBudgetData(data);
        console.log("budget function is working");
        // setLoading(false)
      } catch (error) {
        console.log(error);
        // setLoading(false);
      }
    };

    if (token) {
      getData();
      getBudget();
    }
  }, [token, timeperiod]);

  console.log("transaction data in data Context :", tranData);

  useEffect(() => {
    // ==================================
    // Refactoring Data into categories
    // ==================================
    if (tranData.length > 0) {
      const refactorData = function () {
        const debitTrans = tranData.filter((trans) => trans.tran_sign === "DR");
        console.log("refactoring data / trandebit", debitTrans);
        const groupedObjects = debitTrans.reduce((result, obj) => {
          const { category_name, tran_amount } = obj;
          if (!result[category_name]) {
            result[category_name] = { name: category_name, spent: 0, limit: 0 };
          }
          result[category_name].spent += Number(tran_amount);
          return result;
        }, {});

        const filteredArray = Object.values(groupedObjects);

        setCategoriesObj(groupedObjects);
        setCategories(filteredArray.sort((a, b) => b.spent - a.spent));
      };
      if (token) {
        refactorData();
      }
    }
  }, [tranData]);

  console.log("transaction data:", tranData);
  console.log("Budget data:", budgetData);
  console.log("categories:", categories);

  //   console.log("decoded token id:", decodedToken);

  return (
    <DataContext.Provider
      value={{
        tranData,
        setTranData,
        budgetData,
        setBudgetData,
        categories,
        setCategories,
        categoriesObj,
        decodedToken,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}
