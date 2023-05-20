import React, { useState, useReducer } from "react";

const initialState = {
  name: "",
  amount: "",
};

const reducer = (state, action) => {
  return { ...state, [action.name]: action.value };
};

const TransactionForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    const action = {
      name: e.target.name,
      value: e.target.value,
    };
    dispatch(action);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
  };

  return (
    <>
      <h3>Add Transasction</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Transaction name:</span>
          <input
            type="text"
            name="name"
            required
            onChange={handleChange}
            value={state.name}
          />
        </label>
        <label>
          <span>Transaction amount:</span>
          <input
            type="number"
            name="amount"
            required
            onChange={handleChange}
            value={state.amount}
          />
        </label>
        <button type="submit" onClick={handleSubmit}>
          Add Transaction
        </button>
      </form>
    </>
  );
};

export default TransactionForm;
