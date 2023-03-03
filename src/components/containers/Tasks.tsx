import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'
import Icon from 'react-native-vector-icons/Ionicons'
import { Link, useNavigate } from 'react-router-native'
import { ITask } from '../../interfaces/ITask'
import { bringTasks, updateTask } from '../../services/TasksServices'
import { constantsTheme } from '../../themes'

const Tasks = () => {
	const [tasks, setTasks] = useState([] as ITask[])

	const navigate = useNavigate()

	useEffect(() => {
		bringTasks()
			.then(res => setTasks(res))
			.catch(e => console.error(e))
	}, [])

	const handleComplete = (id: number) => {
		const updatedTasks = tasks.map(task => {
			if (task.id === id) {
				const ttask = { ...task, completed: !task.completed }
				updateTask(task.id, ttask)
				return ttask
			} else {
				return task
			}
		})
		setTasks(updatedTasks)
	}

	return (
		<View style={constantsTheme.container}>
			<View style={{ padding: 20 }}>
				<View>
					<TouchableOpacity
						onPress={() => navigate('/')}
						style={{ width: 50, height: 50 }}>
						<Icon name='ios-chevron-back' size={24} color='#666' />
					</TouchableOpacity>
				</View>
				<View>
					{tasks.map(task => {
						return (
							<View key={task.id} style={styles.cardTask}>
								<View style={styles.details}>
									<TouchableOpacity
										style={{ paddingRight: 10 }}
										onPress={() => {
											handleComplete(task.id)
										}}>
										<Icon
											name={
												task.completed
													? 'ios-checkmark-circle'
													: 'ios-checkmark-circle-outline'
											}
											size={24}
											color='#666'
										/>
									</TouchableOpacity>
									<Text
										category='h6'
										style={[
											styles.titleTask,
											task.completed && styles.completed,
										]}>
										{task.title}
									</Text>
								</View>
							</View>
						)
					})}
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	cardTask: {
		paddingVertical: 10,
		paddingHorizontal: 10,
		backgroundColor: '#333',
		marginTop: 10,
	},
	details: {
		flexDirection: 'row',
	},
	titleTask: {
		color: '#E9ECEF',
		fontWeight: '200',
		letterSpacing: 0.6,
	},
	completed: {
		textDecorationLine: 'line-through',
	},
})

export default Tasks
