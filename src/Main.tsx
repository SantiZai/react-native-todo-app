import React from 'react'
import { Routes, Route } from 'react-router-native'
import HomePage from './components/pages/HomePage'
import NewTask from './components/pages/NewTask'
import TasksPage from './components/pages/TasksPage'
import Task from './components/pures/Task'

const Main = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/tasks' element={<TasksPage />} />
            <Route path='/tasks/:id' element={<Task />} />
            <Route path='/newtask' element={<NewTask />} />
        </Routes>
    )
}

export default Main