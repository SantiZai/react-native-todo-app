import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'
import Icon from 'react-native-vector-icons/Ionicons'
import { Link, useNavigate } from 'react-router-native'
import { ITask } from '../../interfaces/ITask'
import {
	bringTasks,
	deleteTask,
	updateTask,
} from '../../services/TasksServices'
import { constantsTheme } from '../../themes'

const Tasks = () => {
	const [tasks, setTasks] = useState([] as ITask[])

	const navigate = useNavigate()

	useEffect(() => {
		bringTasks()
			.then(res => setTasks(res))
			.catch(e => console.error(e))
	}, [tasks])

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

	const stylesText = [styles.text, styles.badge]

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
				{tasks.length <= 0 ? (
					<View style={{ height: '80%', justifyContent: 'center' }}>
						<Text category='h1' style={{ textAlign: 'center' }}>
							You haven't tasks
						</Text>
						<Link to='/newtask'>
							<Text style={{ textAlign: 'center' }}>
								Create a new task here
							</Text>
						</Link>
					</View>
				) : (
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
										<Link
											to={`${task.id}`}
											style={{
												justifyContent: 'flex-end',
											}}>
											<Text
												category='h6'
												style={[
													styles.titleTask,
													task.completed &&
														styles.completed,
												]}>
												{task.title}
											</Text>
										</Link>
										<View
											style={{
												justifyContent: 'flex-end',
												marginLeft: 10,
											}}>
											<Text style={{ color: '#E9ECEF' }}>
												{task.description}
											</Text>
										</View>
									</View>
									<View style={{ flexDirection: 'row' }}>
										<View
											style={{
												paddingVertical: 5,
												paddingHorizontal: 15,
												borderRadius: 5,
												marginRight: 5,
												justifyContent: 'flex-end',
												backgroundColor:
													task.level &&
													task.level.toString() ===
														'INFO'
														? '#007474'
														: task.level &&
														  task.level.toString() ===
																'WARNING'
														? '#C3B000'
														: '#A80A00',
											}}>
											<Text style={stylesText}>
												{task.level}
											</Text>
										</View>
										<TouchableOpacity
											onPress={async () => {
												await deleteTask(task.id)
												navigate('/tasks')
											}}
											style={{
												marginRight: 10,
												alignItems: 'flex-end',
												justifyContent: 'center'
											}}>
											<Icon
												name='ios-trash'
												size={24}
												color='#999'
											/>
										</TouchableOpacity>
									</View>
								</View>
							)
						})}
					</View>
				)}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	cardTask: {
		paddingVertical: 15,
		paddingHorizontal: 10,
		backgroundColor: '#333',
		marginTop: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderRadius: 5,
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
	text: {
		textAlign: 'center',
		color: '#E9ECEF',
	},
	badge: {
		fontWeight: 'bold',
		letterSpacing: 0.4,
	},
})

export default Tasks
