import config from '../../config';

class SocialApi {
	static authUser() {
		return fetch(`${config.url}/api/insta/authorize_user`, {
			method: 'POST',
			//body: JSON.stringify({email: email, password: password}),
			headers: config.configHeaders
		})
			.then(response => {
				return response.json();
			})
			.catch(error => {
				throw error;
			});
	}
	static getFeedInstagram(instaToken) {
		return fetch(`${config.url}/api/insta/getFeed`, {
			method: 'POST',
			headers: config.configHeaders,
			body: JSON.stringify({ instaToken: instaToken })
		})
			.then(response => {
				return response.json();
			})
			.catch(error => {
				throw error;
			});
	}
}
export default SocialApi;
