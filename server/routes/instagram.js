const express = require('express');
const router = express.Router();
const https = require('https');
const insta = require('instagram-node').instagram();

//Used in the instagram-node package
var redirect_uri = `${process.env.API_URL}/api/insta/getToken`;
console.log(redirect_uri);
console.log(process.env.API_URL + 'aaaaaaaaaa');
const getAuthUrl = function(req, res) {
	insta.use({
		client_id: process.env.INSTA_CLIENT,
		client_secret: process.env.INSTA_SECRET
	});
	res.send({
		success: true,
		url: insta.get_authorization_url(redirect_uri, {
			scope: ['likes', 'basic', 'public_content'],
			state: 'a state'
		})
	});
};
router.post('/authorize_user', getAuthUrl);
router.get('/getToken', (req, res) => {
	insta.authorize_user(req.query.code, redirect_uri, function(err, result) {
		if (err) {
			console.log(err.body);
			res.send('Didn\'t work');
		} else {
			console.log('Yay! Access token is ' + result.access_token);
			res.redirect(`gunlun://instaAuth?token=${result.access_token}`);
		}
	});
});

router.post('/getFeed', (req, res) => {
	req.body.tagParam = 'guneetsLunch';
	const options = {
		host: 'api.instagram.com',
		path: `/v1/tags/${req.body.tagParam}/media/recent?access_token=${req.body
			.instaToken}`,
		method: 'GET'
	};

	const instaReq = https.get(options, function(response) {
		let bodyChunks = [];
		response
			.on('data', function(chunk) {
				bodyChunks.push(chunk);
			})
			.on('end', function() {
				let body = Buffer.concat(bodyChunks);
				body = JSON.parse(body);
				res.status(200).send({ success: true, message: body });
			});
	});

	instaReq.on('error', function(e) {
		res.status(400).send({ success: false, snaps: e });
	});

	instaReq.end();
});

module.exports = router;
