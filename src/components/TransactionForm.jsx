import React, { useEffect, useReducer } from "react";
import useFirestore from "../hooks/useFirestore";

const initialState = {
  name: "",
  amount: "",
};

const reducer = (state, action) => {
  if (action.type == "success") {
    return { name: "", amount: "" };
  }
  return { ...state, [action.name]: action.value };
};

const TransactionForm = ({ uid }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { addData, response } = useFirestore();

  const handleChange = (e) => {
    const action = {
      name: e.target.name,
      value: e.target.value,
    };
    dispatch(action);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.name && state.amount) {
      addData(uid, state.name, state.amount);
    }
  };

  useEffect(() => {
    if (response.success) {
      dispatch({ type: "success" });
    }
  }, [response.success]);

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
        {!response.isPending && (
          <button type="submit" onClick={handleSubmit}>
            Add Transaction
          </button>
        )}
        {response.isPending && (
          <button type="submit" disabled>
            Adding...
          </button>
        )}
      </form>
    </>
  );
};

export default TransactionForm;
