async function handleProfileGet(req, res, db) {
	const { id } = req.params;

	try {
		const user = await db.select('*').from('users').where({ id });

		if (!user.length) {
			res.status(400).json('not found');
		}

		res.json(user[0]);
	} catch (error) {
		console.error(error);
		res.status(400).json('error getting user');
	}
}

module.exports = {
	handleProfileGet,
};
