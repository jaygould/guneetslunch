import { Navigation } from 'react-native-navigation';

import Home from './modules/home/Home';

import Instagram from './modules/feed/Instagram';

export function registerScreens(store, Provider) {
	Navigation.registerComponent('testapp.Home', () => Home, store, Provider);
	Navigation.registerComponent(
		'testapp.Instagram',
		() => Instagram,
		store,
		Provider
	);
}
