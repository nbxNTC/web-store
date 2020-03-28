const connection = require('../database/connection');

module.exports = {
	async orders(req, res) {
		const { page = 1, order = 'asc'} = req.query;		

        var orderBy = 'asc';

        if(order == 'asc')
            orderBy = 'asc';
        if(order == 'desc')
            orderBy = 'desc';

		const [count] = await connection('orders')			
			.count();        
    
		const orders = await connection('orders')		
        .limit(9)
        .offset((page - 1) * 9)
        .orderBy('value', orderBy);    
        
        res.header('X-Total-Count', count['count(*)']);
        return res.json(orders);  
       
	},        
	async profiles(req, res) {  
		const profiles = await connection('profiles')            
			.select('*');

		return res.json(profiles);
	},
}