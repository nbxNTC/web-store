const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index(req, res) {  
        const client_id = req.headers.authorization;
        
        const profile = await connection('profiles')
            .where('id', client_id)
            .select('*');

        return res.json(profile);
    },    
    async create(req, res) {
		const { name, email, whatsapp, city, uf } = req.body;				
        const id = crypto.randomBytes(4).toString('HEX');
        
        await connection('profiles').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        });  
        		
        return res.json({ id });
    },
    async update(req, res) {  
        const { name, email, whatsapp, city, uf } = req.body;
        const client_id = req.headers.authorization;
        
        await connection('profiles')
            .where('id', client_id)
            .update({                
                "name": name,
                "email": email,
                "whatsapp": whatsapp,
                "city": city,
                "uf": uf 
            });

        return res.status(204).send();
    },
    async delete(req, res) {	
        const client_id = req.headers.authorization;        
        
        await connection('profiles')
            .where('id', client_id)
            .delete();
        		
        return res.status(204).send();
    },
}