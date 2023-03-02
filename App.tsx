import * as eva from '@eva-design/eva'
import { ApplicationProvider } from '@ui-kitten/components'
import { NativeRouter } from 'react-router-native'
import Main from './src/Main'

export default function App() {
	return (
		<NativeRouter>
			<ApplicationProvider {...eva} theme={eva.light}>
				<Main />
			</ApplicationProvider>
		</NativeRouter>
	)
}
