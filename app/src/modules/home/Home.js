import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';

import { Button, Icons } from 'react-native-elements';

class Home extends Component {
	constructor(props) {
		super(props);
		this.goToFeed = this.goToFeed.bind(this);
	}

	goToFeed() {
		this.props.navigator.push({
			screen: 'testapp.Instagram', // unique ID registered with Navigation.registerScreen
			title: 'Guneet\'s Lunch', // navigation bar title of the pushed screen (optional)
			titleImage: require('../../img/glheader.png'), //navigation bar title image instead of the title text of the pushed screen (optional)
			passProps: {}, // Object that will be passed as props to the pushed screen (optional)
			animated: true, // does the push have transition animation or does it happen immediately (optional)
			animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the push have different transition animation (optional)
			//backButtonTitle: 'undefined', // override the back button title (optional)
			backButtonHidden: false, // hide the back button altogether (optional)
			navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
			navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
		});
	}

	render() {
		return (
			<View style={styles.homeContainer}>
				<Image source={require('../../img/gllogo.png')} style={styles.logo} />

				<Button
					onPress={this.goToFeed}
					//icon={{ name: 'account-box', size: 32, color: '#fff' }}
					buttonStyle={styles.btn}
					textStyle={styles.btnText}
					title={'Enter'}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	logo: {
		marginBottom: 100
	},
	homeContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 30
	},
	btn: {
		backgroundColor: 'rgb(215, 117, 27)',
		borderRadius: 30,
		marginTop: 20,
		padding: 20,
		width: '100%'
	},
	btnText: {
		textAlign: 'center',
		fontSize: 14
	}
});
function mapStateToProps(state, ownProps) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
