const crypto = require('crypto');
const connection = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqueId')

module.exports = {
    async index(req, res) {

        const ongs = await connection('ongs').select("*");

        return res.json(ongs);
    },

    async create(req, res) {
        
        const {name, email, whatsapp, city, uf} = req.body;

       // const id = crypto.randomBytes(4).toString('HEX');
          const id = generateUniqueId();

        const ongs = await connection('ongs').select('*');

        for(let i = 0; i < ongs.length; i++) {
            if(ongs[i].name == name || ongs[i].email == email || ongs[i].whatsapp == whatsapp) {
                return res.status(403).json({error: 'Requisicao Proibida. Algum campo já existente'});  
            }
        }
        
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        return res.json({ id });
    }
}