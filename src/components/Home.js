import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InputTask from './InputTask';
import EditTask from './EditTask';

const Home = () => {
    const [data, setData] = useState(null);
    const [editingTaskId, setEditingTaskId] = useState(null);

    // Function to fetch tasks from backend
    const fetchData = async () => {
        try {
            const response = await axios.get('https://todo-mern-backend-v8tn.onrender.com');
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Initial data fetch on component mount
    useEffect(() => {
        fetchData();
    }, []);

    // Function to handle task addition
    const handleTaskAdded = () => {
        fetchData(); // Fetch data again after a new task is added
    };

    // Function to handle task update
    const handleTaskUpdated = () => {
        fetchData(); // Fetch data again after a task is updated
        setEditingTaskId(null); // Clear editing mode
    };

    // Function to handle task deletion
    const handleDeleteTask = async (id) => {
        try {
            await axios.delete(`https://todo-mern-backend-v8tn.onrender.com/delete/${id}`);
            window.location.reload()
            fetchData(); // Fetch data again after a task is deleted
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    // Function to toggle task completion status
    const toggleTaskCompletion = async (id) => {
        try {
            const response = await axios.patch(`https://todo-mern-backend-v8tn.onrender.com/update/${id}`);
            if (response.status === 200) {
                fetchData(); // Fetch data again after toggling completion
            }
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

   
    return (
        <div className='flex flex-col gap-2 max-w-full h-screen'>
            <InputTask onTaskAdded={handleTaskAdded} />
            {data ? (
                <ul>
                    {data.allTasks.length > 0 ? (
                        data.allTasks.map(task => (
                            <li key={task._id}>
                                <div className='w-full px-80'>
                                    {editingTaskId === task._id ? (
                                        // Edit mode
                                        <EditTask 
                                            task={task} 
                                            onTaskUpdated={handleTaskUpdated} 
                                            onCancel={() => setEditingTaskId(null)}
                                        />
                                    ) : (
                                        // Display mode
                                        <div className='flex justify-between border w-full mt-3 border-black rounded px-6 py-2'>
                                            <div className={`flex items-center gap-2 break-words flex-1`}>
                                                <input 
                                                    type="checkbox" 
                                                    checked={task.completed} 
                                                    onChange={() => toggleTaskCompletion(task._id)}
                                                />
                                                <p 
                                                    className={`text-base sm:text-xl pl-1 flex-1 cursor-pointer ${task.completed ? 'line-through opacity-50' : ''}`} 
                                                    onClick={() => toggleTaskCompletion(task._id)}
                                                    // Ensure word wrap
                                                >
                                                    {task.task}
                                                </p>
                                            </div>
                                            <div className='flex gap-5'>
                                                <div className='cursor-pointer text-emerald-400' onClick={() => setEditingTaskId(task._id)}>
                                                    <i className="fa-solid fa-pen"></i>
                                                </div>
                                                <div className='cursor-pointer text-red-400' onClick={() => handleDeleteTask(task._id)}>
                                                    <i className="fa-solid fa-trash"></i>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </li>
                        ))
                    ) : (
                        <p className="text-center mt-4 text-gray-500">No tasks available</p>
                    )}
                </ul>
            ) : (
                <p className="text-center mt-4 text-gray-500">No tasks available</p>
            )}
        </div>
    );
};

export default Home;
