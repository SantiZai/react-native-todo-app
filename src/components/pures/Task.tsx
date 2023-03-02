import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { Link, useParams } from 'react-router-native'
import { ITask } from '../../interfaces/ITask'
import { bringTask } from '../../services/TasksServices'
import { constantsTheme } from '../../themes'

const Task = () => {
    const [task, setTask] = useState({} as ITask)

    const { id } = useParams()
    console.log(id)

    useEffect(() => {
      bringTask(id)
        .then(res => setTask(res))
        .catch(e => console.error(e))
    }, [])

    return (
        <View style={constantsTheme.container}>
            <Text>Task {id}</Text>
            <Text>{task.title}</Text>
            <Link to='/tasks/' children={<Text>Volver</Text>} />
        </View>
    )
}

export default Task