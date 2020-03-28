const connection = require('../database/connection');

module.exports = {
	async create(req, res) {

		const { id } = req.body;

		const profile = await connection('profiles')
			.where('id', id)
			.first()

		if (!profile) {
			return res.status(400).json({ error: 'Nenhum perfil encontrado com este ID.' })
		}

		return res.json(profile);

	}
}