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
            res.append('X-Total-Count', count['count(*)']);
            const serializedProducts = products.map(product => {
                return {
                  ...product,
                  image: `http://192.168.0.102:3333/uploads/${product.image}`
                };
              });
            return res.json(serializedProducts);  
        } else {
            res.append('X-Total-Count', countByName['count(*)']);
            const serializedProducts = productsByName.map(product => {
                return {
                  ...product,
                  image: `http://192.168.0.102:3333/uploads/${product.image}`
                };
              });
            return res.json(serializedProducts);             
        }
    },    
    async create(req, res) {
        const { title, value, plataform } = req.body;
        const client_id = req.headers.authorization;

        const [id] = await connection('products').insert({
            title,
            value,
            plataform,
            image: req.file.filename,
        });        

        const product_owner = {
            'product_id': id,
            'owner_id': client_id
        }

        const response = await connection('product_owner')
            .insert(product_owner);

        return res.json({ product_owner });
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
        if (title) {
            await connection('products')
            .where('id', id)
            .update({
                'title': title,               
            });
        }
        if (plataform) {
            await connection('products')
            .where('id', id)
            .update({
                'plataform': plataform,                
            });
        }
        if (value) {
            await connection('products')
            .where('id', id)
            .update({
                'value': value,                
            });
        }
        if (req.file) {
            await connection('products')
            .where('id', id)
            .update({
                'image': req.file.filename,                
            });
        }        

        return res.status(204).send();
    }
}