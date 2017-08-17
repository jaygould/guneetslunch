import { Linking } from 'react-native';
import SafariView from 'react-native-safari-view';
import { getUrlParams } from './../utils/utils.service';
import { connectionErrorTimeout } from './../errors/error.reducer';
import SocialApi from './social.api';
import {
	instaSaveAccessToken,
	instaAccessTokenError,
	instaGettingInstagramToken,
	instaGettingInstagramFeed,
	instaSaveFeed,
	instaGettingFeedError
} from './feed.reducer';

export const authUserInstagram = () => {
	return dispatch => {
		dispatch(instaGettingInstagramToken());
		return SocialApi.authUser()
			.then(response => {
				SafariView.show({
					url: response.url,
					fromBottom: true
				});
				Linking.addEventListener('url', event => {
					dispatch(_handleUrl(event));
				});
			})
			.catch(error => {
				dispatch(instaAccessTokenError());
				dispatch(connectionErrorTimeout());
			});
	};
};

const _handleUrl = event => {
	return dispatch => {
		Linking.removeEventListener('url', _handleUrl());
		var url = new getUrlParams(event.url);
		const accessToken = url.token;
		const error = url.error;

		if (!error) {
			dispatch(instaSaveAccessToken(accessToken));
		} else {
			dispatch(instaAccessTokenError(error));
		}
		SafariView.dismiss();
	};
};

export const getFeedInstagram = instaToken => {
	return dispatch => {
		dispatch(instaGettingInstagramFeed());
		return SocialApi.getFeedInstagram(instaToken)
			.then(response => {
				if (response.success) {
					dispatch(instaSaveFeed(response.message));
				} else {
					dispatch(instaGettingFeedError(response.message));
				}
			})
			.catch(error => {
				dispatch(connectionErrorTimeout());
			});
	};
};
