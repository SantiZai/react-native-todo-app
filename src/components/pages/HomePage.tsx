import React from 'react'
import {
	View,
	ImageBackground,
	StyleSheet,
	TouchableWithoutFeedback,
	TouchableHighlight,
} from 'react-native'
import { constantsTheme } from '../../themes'
import { Link, useNavigate } from 'react-router-native'
import { Text } from '@ui-kitten/components'
import Icon from 'react-native-vector-icons/Ionicons'

const bgImage = require('../../../assets/bg-home.jpg')

const HomePage = () => {
	const navigate = useNavigate()

	return (
		<View style={constantsTheme.container}>
			<ImageBackground source={bgImage} style={styles.bgImage}>
				<View style={styles.container}>
					<View style={{ width: '100%', top: '20%' }}>
						<Text category='h1' style={styles.title}>
							My day
						</Text>
					</View>
					<View style={styles.containerNav}>
						<TouchableHighlight
							style={styles.containerIcon}
							activeOpacity={0.8}
							underlayColor='#DEE2E6'
							onPress={() => navigate('/account')}>
							<View style={styles.icon}>
								<Icon name='ios-person' size={24} color='#333' />
								<Text>Account</Text>
							</View>
						</TouchableHighlight>
						<View
							style={{
								width: '60%',
								flexDirection: 'row',
								justifyContent: 'center',
							}}>
							<TouchableHighlight
								style={styles.containerText}
								activeOpacity={0.8}
								underlayColor='#DEE2E6'
								onPress={() => navigate('/newtask')}>
								<View>
									<Link
										to='/'
										children={
											<TouchableWithoutFeedback>
												<Text
													category='h4'
													style={styles.text}>
													+
												</Text>
											</TouchableWithoutFeedback>
										}
									/>
								</View>
							</TouchableHighlight>
						</View>
						<TouchableHighlight
							style={styles.containerIcon}
							activeOpacity={0.8}
							underlayColor='#DEE2E6'
							onPress={() => navigate('/tasks')}>
							<View style={styles.icon}>
								<Icon
									name='ios-clipboard'
									size={24}
									color='#333'
								/>
								<Text>Tasks</Text>
							</View>
						</TouchableHighlight>
					</View>
				</View>
			</ImageBackground>
		</View>
	)
}

const styles = StyleSheet.create({
	title: {
		color: '#333',
		textAlign: 'center',
	},
	bgImage: {
		flex: 1,
		width: '100%',
		height: '100%',
	},
	containerText: {
		backgroundColor: '#E9ECEF',
		width: 80,
		height: 80,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 40,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		bottom: 25,
	},
	containerIcon: {
		width: 80,
		height: 80,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 40,
	},
	text: {
		color: '#333',
		textAlign: 'center',
	},
	container: {
		width: '100%',
		height: '100%',
		padding: 0,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	containerNav: {
		backgroundColor: '#E9ECEF',
		borderRadius: 40,
		width: '80%',
		flexDirection: 'row',
		justifyContent: 'center',
		paddingHorizontal: 30,
		marginBottom: 30,
	},
	icon: {
		justifyContent: 'center',
		alignItems: 'center',
	},
})

export default HomePage
