import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from '@ui-kitten/components'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigate, useParams } from 'react-router-native'
import { ITask } from '../../interfaces/ITask'
import { bringTask, deleteTask } from '../../services/TasksServices'
import { constantsTheme } from '../../themes'

const Task = () => {
	const [task, setTask] = useState({} as ITask)

	const { id } = useParams()

	useEffect(() => {
		bringTask(id)
			.then(res => setTask(res))
	}, [])

	const navigate = useNavigate()

	const stylesContainer = [constantsTheme.container, styles.container]
	const stylesText = [styles.text, styles.badge]

	return (
		<View style={stylesContainer}>
			<View style={{ width: '100%', padding: 20 }}>
				<TouchableOpacity
					onPress={() => navigate('/tasks')}
					style={{ width: 50, height: 50 }}>
					<Icon name='ios-chevron-back' size={24} color='#666' />
				</TouchableOpacity>
			</View>
			<View
				style={{
					width: '80%',
					backgroundColor: '#333',
					justifyContent: 'center',
					alignItems: 'center',
                    borderRadius: 10
				}}>
				<View style={styles.containerTask}>
					<View style={{ alignItems: 'flex-end' }}>
						<TouchableOpacity
							style={{
								width: 50,
								height: 50,
								alignItems: 'flex-end',
							}}>
							<Icon
								name='ios-chevron-back'
								size={24}
								color='#999'
							/>
						</TouchableOpacity>
					</View>
					<View style={{marginVertical: 50, gap: 30}}>
						<Text style={styles.text} category='h2'>
							{task.title}
						</Text>
						<Text style={styles.text} category='h6'>
							{task.description}
						</Text>
					</View>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
                            marginTop: 50
						}}>
						<View style={{ flexDirection: 'row' }}>
							<TouchableOpacity
                                onPress={async () => {
                                    await deleteTask(task.id)
                                    navigate('/tasks')
                                }}
								style={{
									marginRight: 10,
									alignItems: 'flex-end',
								}}>
								<Icon name='ios-trash' size={24} color='#999' />
							</TouchableOpacity>
							<TouchableOpacity
                                onPress={() => navigate(`/newtask/${id}`)}
								style={{
									alignItems: 'flex-end',
								}}>
								<Icon
									name='ios-pencil'
									size={24}
									color='#999'
								/>
							</TouchableOpacity>
						</View>
						<View
							style={{
								paddingVertical: 5,
								paddingHorizontal: 15,
								borderRadius: 5,
								backgroundColor:
									task.level && task.level.toString() === 'INFO'
										? '#007474'
										: task.level && task.level.toString() === 'WARNING'
										? '#C3B000'
										: '#A80A00',
							}}>
							<Text style={stylesText}>{task.level}</Text>
						</View>
					</View>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
        gap: 100,
        backgroundColor: '#E9ECEF'
	},
	containerTask: {
		width: '100%',
		padding: 30,
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

export default Task
