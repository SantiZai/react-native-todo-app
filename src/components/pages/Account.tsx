import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Text } from '@ui-kitten/components'
import { useNavigate } from 'react-router-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { constantsTheme } from '../../themes'

const Account = () => {
    const navigate = useNavigate()

    return (
        <View style={constantsTheme.container}>
            <View style={{ width: '100%', padding: 20 }}>
                <TouchableOpacity
                    onPress={() => navigate('/')}
                    style={{ width: 50, height: 50 }}>
                    <Icon name='ios-chevron-back' size={24} color='#666' />
                </TouchableOpacity>
            </View>
            <View style={{ height: '70%', justifyContent: 'center', alignItems: 'center' }}>
                <Text category='h4'>This page is in development</Text>
            </View>
        </View>
    )
}

export default Account