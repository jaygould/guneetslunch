import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';

import { getFeedInstagram } from './feed.service';

class InstagramFeed extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		console.log('CWM');
		this.props.getFeed(this.props.instaToken);
	}

	_renderPost = ({ item }) =>
		<InstagramPost
			id={item.id}
			image={item.images.standard_resolution.url}
			caption={item.caption.text}
			poster={item.user.full_name}
			posterImg={item.user.profile_picture}
		/>;

	render() {
		return (
			<View style={styles.container}>
				{this.props.instagramFeed
					? <FlatList
							style={styles.flatList}
							data={this.props.instagramFeed.data}
							keyExtractor={item => item.id}
							renderItem={this._renderPost}
						/>
					: <Text style={styles.holdingText} />}
			</View>
		);
	}
}

function mapStateToProps(store) {
	return {
		instaToken: store.feed.instagramAccessToken,
		instagramFeedPending: store.feed.instagramFeedPending,
		instagramFeed: store.feed.instagramFeed,
		instagramFeedError: store.feed.instagramFeedError
	};
}
function mapDispatchToProps(dispatch) {
	return {
		getFeed: instaToken => {
			dispatch(getFeedInstagram(instaToken));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(InstagramFeed);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: '#e1e1e1'
	},
	holdingText: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	flatList: {},
	instagramPostSingle: {
		flex: 1,
		marginBottom: 10,
		borderWidth: 0,
		borderColor: '#ddd',
		backgroundColor: 'white',
		width: '100%'
	},
	postImg: {
		width: '100%',
		height: 300
	},
	postTextWrap: {
		marginBottom: 18,
		marginTop: 18,
		paddingLeft: 20,
		paddingRight: 20,
		flex: 1,
		flexDirection: 'row'
	},
	profilePic: { width: 35, height: 35 },
	postText: {
		fontSize: 12,
		marginLeft: 10,
		alignSelf: 'center'
	}
});

const InstagramPost = props => {
	return (
		<View style={styles.instagramPostSingle}>
			<Image style={styles.postImg} source={{ uri: props.image }} />
			<View style={styles.postTextWrap}>
				<Image style={styles.profilePic} source={{ uri: props.posterImg }} />
				<Text style={styles.postText}>
					{props.caption} - Posted by {props.poster}
				</Text>
			</View>
		</View>
	);
};
