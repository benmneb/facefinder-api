const Clarifai = require('clarifai');

const app = new Clarifai.App({
	apiKey: '3aeda049c43741d6baa22d892627d7e5',
});

async function handleApiCall(req, res) {
	try {
		const data = await app.models.predict(
			Clarifai.FACE_DETECT_MODEL,
			req.body.input
		);

		if (!data) {
			res.status(400).json('no data returned from API call');
		}

		res.json(data);
	} catch (error) {
		console.error(error);
		res.status(400).json('unable to work with API');
	}
}

async function handleImage(req, res, db) {
	const { id } = req.body;

	try {
		const entries = await db('users')
			.where('id', '=', id)
			.increment('entries', 1)
			.returning('entries');

		if (!entries) {
			res.status(400).json('no user entries found');
		}

		res.json(entries[0]);
	} catch (error) {
		console.error(error);
		res.status(400).json('unable to get entries');
	}
}

module.exports = {
	handleImage,
	handleApiCall,
};
