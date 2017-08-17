import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';

import { authUserInstagram } from './feed.service';
import ErrorBar from './../errors/ErrorBar';
import InstagramFeed from './InstagramFeed';

class Instagram extends Component {
	constructor(props) {
		super(props);
	}
	static navigatorStyle = {
		statusBarTextColorScheme: 'light'
	};
	render() {
		let loginView = null;
		if (!this.props.instagramAccessTokenPending) {
			loginView = (
				<View style={styles.container}>
					<Image source={require('../../img/insta.png')} style={styles.logo} />
					<Button
						onPress={this.props.authUser}
						// icon={{ name: 'vpn-key', size: 32, color: '#444' }}
						buttonStyle={styles.btn}
						textStyle={styles.btnText}
						title={'Connect to Instagram'}
					/>
				</View>
			);
		} else {
			loginView = (
				<View style={styles.container}>
					<Text>Connecting...</Text>
				</View>
			);
		}
		return (
			<View style={styles.container}>
				<ErrorBar />
				{this.props.instagramAccessTokenError
					? <Text>
							{this.props.instagramAccessTokenError}
						</Text>
					: null}
				{this.props.instagramAccessToken ? <InstagramFeed /> : loginView}
			</View>
		);
	}
}

function mapStateToProps(store) {
	return {
		instagramAccessToken: store.feed.instagramAccessToken,
		instagramAccessTokenPending: store.feed.instagramAccessTokenPending,
		instagramAccessTokenError: store.feed.instagramAccessTokenError
	};
}
function mapDispatchToProps(dispatch) {
	return {
		authUser: () => {
			dispatch(authUserInstagram());
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Instagram);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
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
	},
	logo: {
		resizeMode: 'contain',
		width: 100
	}
});
