// Actions
export const instaGettingInstagramToken = () => {
	return {
		type: 'INSTAGRAM_ACCESSTOKEN_PENDING'
	};
};
export const instaSaveAccessToken = accessToken => {
	return {
		type: 'INSTAGRAM_SAVE_ACCESS_TOKEN',
		accessToken
	};
};
export const instaAccessTokenError = error => {
	return {
		type: 'INSTAGRAM_SET_ACCESSTOKEN_ERROR',
		error
	};
};
export const instaGettingInstagramFeed = () => {
	return {
		type: 'INSTAGRAM_GET_FEED_PENDING'
	};
};
export const instaSaveFeed = feed => {
	return {
		type: 'INSTAGRAM_SAVE_FEED',
		feed
	};
};
export const instaGettingFeedError = error => {
	return {
		type: 'INSTAGRAM_GET_FEED_ERROR',
		error
	};
};
//Reducer
let initialState = {
	instagramAccessTokenPending: false,
	instagramAccessToken: null,
	instagramAccessTokenError: null,
	instagramFeedPending: false,
	instagramFeed: null,
	instagramFeedError: null
};

export default function(state = initialState, action) {
	switch (action.type) {
	case 'INSTAGRAM_ACCESSTOKEN_PENDING':
		return {
			...state,
			instagramAccessTokenPending: true
		};
	case 'INSTAGRAM_SAVE_ACCESS_TOKEN':
		return {
			...state,
			instagramAccessToken: action.accessToken,
			instagramAccessTokenPending: false
		};
	case 'INSTAGRAM_SET_ACCESSTOKEN_ERROR':
		return {
			...state,
			instagramAccessTokenError: action.error,
			instagramAccessTokenPending: false
		};
	case 'INSTAGRAM_GET_FEED_PENDING':
		return {
			...state,
			instagramFeedPending: true
		};
	case 'INSTAGRAM_SAVE_FEED':
		return {
			...state,
			instagramFeedPending: false,
			instagramFeed: action.feed
		};
	case 'INSTAGRAM_GET_FEED_ERROR':
		return {
			...state,
			instagramFeedPending: false,
			instagramFeedError: action.error
		};
	default:
		return state;
	}
}
