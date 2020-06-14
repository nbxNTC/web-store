const connection = require('../database/connection');

module.exports = {
    async index(req, res) {
        const { pages = 1, title = '', order = 'asc'} = req.query;

        var orderBy = 'asc';

        if(order == 'asc')
            orderBy = 'asc';
        if(order == 'desc')
            orderBy = 'desc';

        const [count] = await connection('products').count();
        const [countByName] = await connection('products').where('title', 'like', '%'+title+'%').count();
    
        const products = await connection('products')
        .limit(9)
        .offset((pages - 1) * 9)
        .orderBy('value', orderBy);
    
        const productsByName = await connection('products')
        .where('title', 'like', '%'+title+'%')
        .limit(9)
        .offset((pages - 1) * 9)
        .orderBy('value', orderBy);;
             
        if (!title) {
            res.header('X-Total-Count', count['count(*)']);
            return res.json(products);  
        } else {
            res.header('X-Total-Count', countByName['count(*)']);
            return res.json(productsByName);  
        }
    },    
    async create(req, res) {
        const { title, value, plataform, imgURL } = req.body;
        const [id] = await connection('products').insert({
            title,
            value,
            plataform,
            imgURL
        });        
        return res.json({ id });
    },
    async delete(req, res) {
        const { id } = req.params;               

        await connection('products')
            .where('id', id)
            .delete();

        return res.status(204).send();
    },
    async update(req, res) {
        const { id } = req.params;
        const { title, value, plataform } = req.body;

        await connection('products')
            .where('id', id)
            .update({
                'title': title,
                'plataform': plataform,
                'value': value
            });

        return res.status(204).send();
    }
}