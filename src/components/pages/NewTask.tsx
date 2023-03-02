import React, { useState, useEffect } from 'react'
import { Text, Button } from '@ui-kitten/components'
import { View, TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { constantsTheme } from '../../themes'
import DropDownPicker from 'react-native-dropdown-picker'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigate } from 'react-router-native'
import { ITask, LEVELS } from '../../interfaces/ITask'
import { saveTask } from '../../services/TasksServices'

const NewTask = () => {
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
	const [items, setItems] = useState([
		{ label: 'Info', value: LEVELS[0] },
		{ label: 'Warning', value: LEVELS[1] },
		{ label: 'Urgent', value: LEVELS[2] },
	])

	const [buttonColor, setButtonColor] = useState('#666')

	const containerStyles = [constantsTheme.container, styles.container]

	const navigate = useNavigate()

	useEffect(() => {
		saveTask(task)
			.then(res => console.log(res))
	  }, [task])

	return (
		<KeyboardAvoidingView
			style={constantsTheme.container}
			behavior='height'
			keyboardVerticalOffset={-250}>
			<View style={{ width: '100%', padding: 20 }}>
				<Icon name='ios-chevron-back' size={24} color='#333' />
			</View>
			<View style={containerStyles}>
				<Text
					category='h1'
					style={{ marginBottom: 100, color: '#333' }}>
					New task
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
					onPress={() => {
						setTask(prevState => ({
							...prevState,
							title: title,
							description: description,
							level: selected
						}))
					}}
					onPressIn={() => setButtonColor('#333')}
					onPressOut={() => setButtonColor('#666')}>
					Create task
				</Button>
			</View>
		</KeyboardAvoidingView>
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

export default NewTask
