// InputTask.js
import axios from "axios";
import React, { useState } from "react";

const InputTask = ({ onTaskAdded }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = async (event) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      try {
        const response = await axios.post('https://todo-mern-backend-v8tn.onrender.com/', { task: inputValue });
        console.log(response.data); // Log the response from the server
        setInputValue(""); // Clear the input field after successful submission
        if (onTaskAdded) {
          onTaskAdded(); // Call the callback function to notify the parent component
        }
      } catch (error) {
        console.log("Error posting data", error);
      }
    }
  };

  return (
    <div className="px-80 mt-10">
      <h1>Input:</h1>
      <input
        className="border px-2 py-1 border-black rounded text-lg"
        placeholder="Enter your task"
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default InputTask;
