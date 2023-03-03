import React from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { constantsTheme } from '../../themes'
import Form from '../pures/Form'

const NewTask = () => {
	return (
		<KeyboardAvoidingView
			style={constantsTheme.container}
			behavior='height'
			keyboardVerticalOffset={-250}>
			<Form />
		</KeyboardAvoidingView>
	)
}

export default NewTask
