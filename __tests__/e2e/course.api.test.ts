import request from 'supertest';
const  app = require("../../src/index")
describe('./products', () => {
    it('should return 200 and empty array',async() => {
        await request(app)
            .get('/api/products')
            .expect(200, {status:"success",code:200,data:{}})
})
})

