import axios from "axios"
import * as React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { formatAmount, formatDate } from "../../utils/format"
import "./TransactionDetail.css"

export default function TransactionDetail() {
  const [hasFetched, setHasfetched] = useState(false)
  const [transaction, setTransaction] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  let { transactionId } = useParams();
  
  console.log(transactionId)

  useEffect(() => {
    const fetchTransactionById = async () => {
      setIsLoading(true)
      setHasfetched(false)

      await axios.get("http://localhost:3001/bank/transactions/" + transactionId).then((response) => {
        console.log(response.data.transaction)
        setTransaction(response.data.transaction)
      }).catch((err) => {
        setError(err);
      });
    }
    fetchTransactionById()
  },[transactionId])
  return (
    <div className="transaction-detail">
      <TransactionCard transaction={transaction} transactionId={transactionId} hasFetched={hasFetched} isLoading={isLoading} error={error} setError={setError} setIsLoading={ setIsLoading} setHasfetched={setHasfetched} />
    </div>
  )
}

export function TransactionCard({ transaction = {}, transactionId = null , isLoading,error,hasFetched,setHasfetched,setIsLoading,setError }) {

  console.log("Card", transaction)

  if (Object.keys(transaction).length<1)
  {
    setHasfetched(true)
    setIsLoading(false)
    
  }
  console.log(Object.keys(transaction).length)
  
  
  return (
    <div className="transaction-card card">
      <div className="card-header">
        {Object.keys(transaction).length <1?<h1>Not Found</h1>:""}
        <h3>Transaction #{transactionId}</h3>
        <p className="category">
          {transaction?transaction.category:""}
        </p>
      </div>

      <div className="card-content">
        <p className="description">
          {transaction?transaction.description:""}
        </p>
      </div>

      <div className="card-footer">
        <p className={`amount ${transaction.amount < 0 ? "minus" : ""}`}>{formatAmount(transaction.amount)}</p>
        <p className="date">{formatDate(transaction.postedAt)}</p>
      </div>
    </div>
  )
}
