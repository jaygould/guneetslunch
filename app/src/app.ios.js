import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { registerScreens } from './screens';
import { iconsMap, iconsLoaded } from './modules/utils/appIcons';

import configureStore from './store/configureStore';

const store = configureStore();

registerScreens(store, Provider);

class App extends Component {
	constructor(props) {
		super(props);
		App.startApp();
	}

	static startApp() {
		Navigation.startSingleScreenApp({
			screen: {
				screen: 'testapp.Home', // unique ID registered with Navigation.registerScreen
				title: 'Welcome', // title of the screen as appears in the nav bar (optional)
				navigatorStyle: {
					drawUnderNavBar: false,
					navBarTranslucent: true,
					navBarBackgroundColor: '#46A546', // change the background color of the nav bar (remembered across pushes)
					navBarTextColor: '#ffffff', // change the text color of the title (remembered across pushes)
					navBarButtonColor: '#fff', // Change color of nav bar buttons (eg. the back button) (remembered across pushes)
					navBarHidden: true // make the nav bar hidden
				}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
				navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
			},
			passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
			animationType: 'slide-down' // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
		});
	}
}
export default App;
