import Config from 'react-native-config';

Config.API_URL;

console.log(Config);
export default {
	url: Config.API_URL,
	configHeaders: {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	}
};
