const connection = require('../database/connection');

module.exports = {
	async index(req, res) {  
        const client_id = req.headers.authorization;
        const orders = await connection('orders')
            .where('client_id', client_id)
            .select('id', 'created_at', 'value');        

        return res.json(orders);
    },		
    async create(req, res) {
		const { value } = req.params;
		const client_id = req.headers.authorization;		

        await connection('orders').insert({
            value,
            client_id,            
		});      
		
		console.log(value);
		console.log(client_id);
		
        return res.status(204).send();
    },
    
    
}