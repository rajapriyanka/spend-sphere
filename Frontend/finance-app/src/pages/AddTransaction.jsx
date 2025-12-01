import React, { useState } from "react";

function AddTransaction() {
  const [form, setForm] = useState({
    type: "income",
    amount: "",
    category: "",
    note: "",
    date: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("New Transaction:", form);

    alert("Transaction Added!");

    setForm({
      type: "income",
      amount: "",
      category: "",
      note: "",
      date: "",
    });
  };

  return (
    <div className="p-8 ml-64">
      <h1 className="text-3xl font-bold mb-6">Add Transaction</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow p-6 rounded-lg w-full max-w-lg"
      >
        {/* Type */}
        <label className="block font-semibold">Type</label>
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1 mb-4"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
          <option value="savings">Savings</option>
        </select>

        {/* Amount */}
        <label className="block font-semibold">Amount</label>
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1 mb-4"
          placeholder="Enter amount"
          required
        />

        {/* Category */}
        <label className="block font-semibold">Category</label>
        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1 mb-4"
          placeholder="Category (eg. Food, Salary)"
          required
        />

        {/* Note */}
        <label className="block font-semibold">Note</label>
        <textarea
          name="note"
          value={form.note}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1 mb-4"
          placeholder="Optional note"
        />

        {/* Date */}
        <label className="block font-semibold">Date</label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1 mb-4"
          required
        />

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 w-full rounded hover:bg-blue-700"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransaction;
