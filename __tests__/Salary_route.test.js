const request = require('supertest');
const app = require('../app')
const { Prisma_connection, Salary_query } = require('../prisma/db_query/db_query');

beforeAll(async () => {
    await Prisma_connection.connect();
});

afterAll(async () => {
    await Prisma_connection.disconnect();
});

beforeEach(async () => {
    await Salary_query.delete_all(); // Clean up the database before each test
});


describe("salary", () => {
    test("Post salary", async () => {
        const res = await request(app).post('/salary')
            .send({
                "employee_id": 123,
                "base_salary": 80000,
                "bonus": 5000,
                "pay_period": "Monthly",
                "currency": "USD"
            })
        expect(res.status).toBe(200 || 201);
        expect(res.body).toHaveProperty('salary_id');
    });

    test("update salary", async () => {
        const res = await request(app).post('/salary')
            .send({
                "employee_id": 123,
                "base_salary": 80000,
                "bonus": 5000,
                "pay_period": "Monthly",
                "currency": "USD"
            })

        const new_res = await request(app).put('/salary')
            .send({
                "salary_id": res.body.salary_id,
                "employee_id": 123,
                "base_salary": 0,
                "bonus": 0,
                "pay_period": "Monthly",
                "currency": "USD"
            })

        expect(new_res.status).toBe(200 || 201);
        expect(new_res.body.base_salary).toBe(0);
        expect(new_res.body.bonus).toBe(0)
    });

    test("delete salary", async () => {
        const res = await request(app).post('/salary')
            .send({
                "employee_id": 123,
                "base_salary": 80000,
                "bonus": 5000,
                "pay_period": "Monthly",
                "currency": "USD"
            })

        await request(app).delete('/salary').query({salary_id: res.body.salary_id})  // Send the query parameters
            .set('Accept', 'application/json');

        const deleted_res = await request(app).get('/salary').query({salary_id: res.body.salary_id} )
            .set('Accept', 'application/json');
        
        expect(deleted_res.body.salary_id).toBe(undefined);
    })

})