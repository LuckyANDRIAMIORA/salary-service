const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const create_salary = async (salary) => {
    const created_salary = await prisma.Salary.create({
        data: {
            employee_id: salary.employee_id,
            base_salary: salary.base_salary,
            bonus: salary.bonus,
            pay_period: salary.pay_period,
            currency: salary.currency
        }
    })

    return created_salary
}

const get_salary = async (salary_id) => {
    const salary = await prisma.Salary.findUnique({
        where: { salary_id: salary_id }
    })
    return salary;
}

const delete_salary = async (salary_id) => {
    await prisma.Salary.delete({
        where: { salary_id: salary_id }
    })
}

const delete_all = async () => {
    await prisma.Salary.deleteMany();
}

const update_salary = async (salary) => {
    const new_salary = await prisma.Salary.update({
        where: { salary_id: salary.salary_id },
        data: {
            employee_id: salary.employee_id,
            base_salary: salary.base_salary,
            bonus: salary.bonus,
            pay_period: salary.pay_period,
            currency: salary.currency
        }
    })

    return new_salary;
}

const get_all_salary = async ()=>{
    const salarys = await prisma.Salary.findMany();
    return salarys;
}

module.exports = { create_salary, delete_all, delete_salary, get_salary, update_salary, get_all_salary }