import React, { useEffect, useState } from 'react'
import { TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import { Text, Button } from '@ui-kitten/components'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigate, useParams } from 'react-router-native'
import DropDownPicker, { ItemType } from 'react-native-dropdown-picker'
import { ITask, LEVELS } from '../../interfaces/ITask'
import { constantsTheme } from '../../themes'
import { saveTask, updateTask } from '../../services/TasksServices'

const Form = () => {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [task, setTask] = useState({
		title: '',
		description: '',
		completed: false,
		level: LEVELS.INFO,
	} as ITask)

	const [open, setOpen] = useState(false)
	const [selected, setSelected] = useState(0)
	const [items, setItems] = useState<ItemType<string | number>[]>([
		{ label: 'Info', value: LEVELS[0] },
		{ label: 'Warning', value: LEVELS[1] },
		{ label: 'Urgent', value: LEVELS[2] },
	])

	const containerStyles = [constantsTheme.container, styles.container]

	const [buttonColor, setButtonColor] = useState('#666')

	const navigate = useNavigate()

	const { id } = useParams()

	return (
		<>
			<View style={{ width: '100%', padding: 20 }}>
				<TouchableOpacity
					onPress={() => navigate('/')}
					style={{ width: 50, height: 50 }}>
					<Icon name='ios-chevron-back' size={24} color='#666' />
				</TouchableOpacity>
			</View>
			<View style={containerStyles}>
				<Text
					category='h1'
					style={{ marginBottom: 100, color: '#333' }}>
					{!id ? 'Create task' : 'Update task'}
				</Text>
				<View style={{ width: '100%' }}>
					<TextInput style={styles.input} onChangeText={setTitle} />
					<TextInput
						style={styles.input}
						multiline={true}
						onChangeText={setDescription}
					/>
					<DropDownPicker
						style={styles.input}
						open={open}
						setOpen={setOpen}
						value={selected}
						setValue={setSelected}
						items={items}
						setItems={setItems}
						dropDownContainerStyle={{
							width: '80%',
							alignSelf: 'center',
						}}
					/>
				</View>
			</View>
			<View style={{ alignItems: 'center', bottom: 100 }}>
				<Button
					style={{
						...styles.button,
						backgroundColor: buttonColor,
					}}
					onPressIn={() => {
						setButtonColor('#333')
						setTask(prevState => ({
							...prevState,
							title: title,
							description: description,
							level: selected,
						}))
					}}
					onPressOut={() => {
						setButtonColor('#666')
						!id ? saveTask(task) : updateTask(parseInt(id), task)
						navigate('/tasks')
					}}>
					Create task
				</Button>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		alignItems: 'center',
		top: 100,
	},
	input: {
		width: '80%',
		padding: 10,
		borderStyle: 'solid',
		borderColor: 'black',
		borderWidth: 1,
		borderRadius: 5,
		marginVertical: 10,
		alignSelf: 'center',
	},
	button: {
		width: '80%',
		borderWidth: 0,
		paddingVertical: 15,
	},
})

export default Form
