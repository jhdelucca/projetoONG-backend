const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG' , () => {
    beforeEach(async () => {
        await connection.migrate.rollback(); /** zera o banco de  dados */
        await connection.migrate.latest(); /** faz o migration antes de criar o banco de testes */
    });

    afterAll(async () => {
        await connection.destroy(); // destroi a conexao com banco de dados depois de realizar todos os testes
    })

    it('should be able to create a new ONG' , async () => {
        const response = await request(app).post('/ongs').send({
            name: "TETO",
            email: "teto@hotmail.com",
            whatsapp: "31984413888",
            city: "Belo Horizonte",
            uf: "MG"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });

    it('should be able to create a new Incident' , async () => {
        const response = await request(app).post('/incidents')
        .set('Authorization' , '881dd2c0')
        .send({
            title:"Teste dos Teste do carai",
            description:"Caso para Teste 56",
            value:550.50  
        });

        expect(response.body).toHaveProperty('id');
    });
});