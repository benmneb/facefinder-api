async function handleSignIn(req, res, db, bcrypt) {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json('incorrect form submission');
	}

	try {
		const data = await db
			.select('email', 'hash')
			.from('login')
			.where('email', '=', email);

		const isValid = await bcrypt.compareSync(password, data[0].hash);

		if (!isValid) {
			return res.status(400).json('wrong credentials');
		}

		try {
			const user = await db
				.select('*')
				.from('users')
				.where('email', '=', email);

			return res.json(user[0]);
		} catch (error) {
			console.error('unable to get user', error);
			res.status(400).json('unable to get user');
		}
	} catch (error) {
		console.error('wrong credentials', error);
		res.status(400).json('wrong credentials');
	}
}

module.exports = {
	handleSignIn: handleSignIn,
};
