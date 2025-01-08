import React, { useState } from 'react';

export default function DynamicInput() {
  const [inputArr, setInputArr] = useState([{ id: 1, value: '' }]);

  // Add a new field
  const addField = () => {
    setInputArr([...inputArr, { id: Date.now(), value: '' }]);
  };

  // Remove a specific field
  const removeField = (id) => {
    setInputArr(inputArr.filter((field) => field.id !== id));
  };

  // Handle input changes
  const onChangeHandler = (id, newValue) => {
    setInputArr(
      inputArr.map((field) =>
        field.id === id ? { ...field, value: newValue } : field
      )
    );
  };

  // Log the final data (for testing purposes)
  const handleSubmit = () => {
    console.log("Submitted Data:", inputArr);
  };

  return (
    <div className="w-screen h-screen bg-stone-100">
      <h1 className="text-2xl font-semibold text-center pt-5 mb-10">
        Dynamic Form
      </h1>
      <div className="flex justify-center mb-5">
        <button
          className="bg-stone-900 text-white py-2 px-5 rounded-lg hover:scale-105 transition-transform"
          onClick={addField}
        >
          + Add Field
        </button>
      </div>
      <div className="px-10 flex items-center flex-col gap-4">
        {inputArr.map((field) => (
          <div key={field.id} className="flex items-center gap-2">
            <input
              className="w-[350px] p-2 rounded-lg border border-gray-300"
              type="text"
              placeholder="Enter value"
              value={field.value}
              onChange={(e) => onChangeHandler(field.id, e.target.value)}
            />
            <button
              className="bg-red-500 text-white px-3 py-1 rounded-lg"
              onClick={() => removeField(field.id)}
            >
              x
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-5">
        <button
          className="bg-green-600 text-white py-2 px-5 rounded-lg hover:scale-105 transition-transform"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
