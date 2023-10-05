import React from 'react';

function CategoryForm({ handleSubmit, value, setValue }) {
  return (
    <form className="bg-white p-4 rounded-lg shadow-md">
      <div className="mb-3">
        <label htmlFor="category" className="block text-gray-700 text-sm font-semibold">New Category</label>
        <input
          type="text"
          id="category"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter New Category"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:ring focus:border-blue-300"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </form>
  );
}

export default CategoryForm;
