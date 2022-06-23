import * as React from "react";
import "./AddTransaction.css";

export default function AddTransaction({
  isCreating,
  setIsCreating,
  form,
  setForm,
  handleOnSubmit,
}) {

  let handleOnFormFieldChange = (event) => {
    const { name, value } = event.target
    
      setForm(current => ({...current, [name]: value
      }))
    

  }

  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>

      <AddTransactionForm
        form={form}
        handleOnFormFieldChange={handleOnFormFieldChange}
        handleOnSubmit={handleOnSubmit}
        isCreating={isCreating}
        setIsCreating={setIsCreating}
      />
    </div>
  );
}

export function AddTransactionForm({handleOnSubmit, handleOnFormFieldChange, form }) {
  console.log("Add", form);
  return (
    <div className="form">
      <div className="fields">
        <div className="field">
          <label>Description</label>
          <input
            
            name="description"
            type="text"
            value={form?.description}
            onChange={handleOnFormFieldChange}
          />
        </div>
        <div className="field">
          <label>Category</label>
          <input
            name="category"
            type="text"
            value={form?.category}
            onChange={handleOnFormFieldChange}
          />
        </div>
        <div className="field half-flex">
          <label>Amount (cents)</label>
          <input
            name="amount"
            type="number"
            value={form?.amount}
            onChange={handleOnFormFieldChange}
          />
        </div>

        <button className="btn add-transaction" type="submit" onClick={handleOnSubmit}>
          Add
        </button>
      </div>
    </div>
  );
}
