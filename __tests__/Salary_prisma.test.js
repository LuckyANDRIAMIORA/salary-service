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

test("create a new salary", async () => {
    const salary = await Salary_query.create_salary({
        "employee_id": 123,
        "base_salary": 80000,
        "bonus": 5000,
        "pay_period": "Monthly",
        "currency": "USD"
    })

    expect(salary).toHaveProperty('salary_id');
    expect(salary.employee_id).toBe(123);
    expect(salary.base_salary).toBe(80000);
    expect(salary.bonus).toBe(5000);
    expect(salary.pay_period).toBe("Monthly");
    expect(salary.currency).toBe("USD");
});

test("delete a salary", async () => {
    const salary = await Salary_query.create_salary({
        "employee_id": 123,
        "base_salary": 80000,
        "bonus": 5000,
        "pay_period": "Monthly",
        "currency": "USD"
    })

    await Salary_query.delete_salary(salary.salary_id);

    const deleted_salary = await Salary_query.get_salary(salary.salary_id);

    expect(deleted_salary).toBe(null)
})

test("update salary", async () => {
    const salary = await Salary_query.create_salary({
        "employee_id": 123,
        "base_salary": 80000,
        "bonus": 5000,
        "pay_period": "Monthly",
        "currency": "USD"
    })

    const updated_salary = await Salary_query.update_salary({
        "salary_id": salary.salary_id,
        "employee_id": 123,
        "base_salary": 0,
        "bonus": 0,
        "pay_period": "Monthly",
        "currency": "USD"
    });

    expect(updated_salary.base_salary === 0).toBe(true)
    expect(updated_salary.bonus === 0).toBe(true)
});
