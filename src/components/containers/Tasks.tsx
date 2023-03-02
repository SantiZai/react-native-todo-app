import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { Link } from 'react-router-native'
import { ITask } from '../../interfaces/ITask'
import { bringTasks } from '../../services/TasksServices'
import { constantsTheme } from '../../themes'

const Tasks = () => {
	const [tasks, setTasks] = useState([] as ITask[])

	useEffect(() => {
		bringTasks()
			.then(res => setTasks(res))
			.catch(e => console.error(e))
	}, [])

	return (
		<View style={constantsTheme.container}>
			{
                tasks.map((task) => {
                    return (
                        <Link key={task.id} to={`/tasks/${task.id}`} children={<Text>{task.title}</Text>} />
                    )
                })
            }
			<Link to='/' children={<Text>Volver</Text>} />
		</View>
	)
}

export default Tasks
