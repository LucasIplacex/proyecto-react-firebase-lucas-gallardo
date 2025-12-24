import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function UserManagementApp() {
    const [tasks, setTasks] = useState([]);

    const addTask = (task) => {
        setTasks([...tasks, task]);
    };

    return (
        <div>
            <h1>Gestion de tareas</h1>
            <TaskForm addTask={addTask} />
            <TaskList tasks={tasks} />
        </div>
    );
}

export default UserManagementApp;