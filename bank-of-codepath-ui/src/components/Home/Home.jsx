import * as React from "react";
import { useEffect } from "react";
import AddTransaction from "../AddTransaction/AddTransaction";
import BankActivity from "../BankActivity/BankActivity";
import "./Home.css";
import axios from "axios";

export default function Home({
  transactions,
  newTransactionForm,
  setNewTransactionForm,
  setTransactions,
  transfers,
  setTransfers,
  error,
  setError,
  isLoading,
  setIsLoading,
  filterInputValue,
  isCreating,
  setIsCreating,
}) {
  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:3001/bank/transactions")
      .then((response) => {
        console.log("response,transactoins", response.data.transactions);
        setTransactions(response.data.transactions);
      })
      .catch((err) => {
        setError(err);
      });
    setIsLoading(false);
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3001/bank/transfers")
      .then((response) => {
        console.log(response.data.transfers);
      })
      .catch((err) => {
        setError(err);
      });
    setIsLoading(false);
  }, []);

  let filteredTransactions = [];
  const filterTransactions = (transactions) => {
    if (filterInputValue != "") {
      return (transactions || []).filter((e) =>
        e.description.toLowerCase().includes(filterInputValue.toLowerCase())
      );
    }
    return transactions;
  };
  filteredTransactions = filterTransactions(transactions);

  console.log(filteredTransactions);

  const handleOnSubmitNewTransaction = () => { 
    handleOnCreateTransaction()
  };
  
  const handleOnCreateTransaction = async() => {
    setIsCreating(true)
   axios.post('http://localhost:3001/bank/transactions', {
      transactions: newTransactionForm 
     
    }
    ).then(function (response)
    {
      setTransactions(current=>[...current,response.data.transaction])
      
      console.log(response)
    }).catch(function (error)
    {
      console.log(error)
      setError(error)
      setIsCreating(false)

    })

    setNewTransactionForm({ category: "", name: "", amount: 0 })
    setIsCreating(false)
    
  }

  return (
    <div className="home">
      <AddTransaction
        isCreating={isCreating}
        setIsCreating={setIsCreating}
        form={newTransactionForm}
        setForm={setNewTransactionForm}
        handleOnSubmit={handleOnSubmitNewTransaction}
      />
      {!isLoading ? (
        <BankActivity transactions={filteredTransactions} />
      ) : (
        <h1>Loading...</h1>
      )}
      {error ? <h2 className="error">{error}</h2> : ""}
    </div>
  );
}
