// EditTask.js
import React, { useState } from 'react';
import axios from 'axios';

const EditTask = ({ task, onTaskUpdated, onCancel }) => {
    const [taskText, setTaskText] = useState(task.task);

    const handleUpdate = async () => {
        try {
            await axios.put(`https://todo-mern-backend-v8tn.onrender.com/edit/${task._id}`, { task: taskText });
            onTaskUpdated();
        } catch (error) {
            console.log("Error updating task", error);
        }
    };

    return (
        <div className='mt-3'>
            <input
                className='border border-black p-2 rounded mr-6 text-lg'
                type="text"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
            />
            <button className='border border-black p-2 rounded-lg mr-4' onClick={handleUpdate}>Update</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};

export default EditTask;
