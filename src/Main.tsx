import React from 'react'
import { Routes, Route } from 'react-router-native'
import Account from './components/pages/Account'
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
            <Route path='/newtask/:id' element={<NewTask />} />
            <Route path='/account' element={<Account />} />
        </Routes>
    )
}

export default Main