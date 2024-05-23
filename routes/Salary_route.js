const { Salary_query } = require("../prisma/db_query/db_query")
const express = require('express');
const router = express.Router();

router.post("/", async (req, res, next) => {
    const salary = req.body;
    await Salary_query.create_salary(salary).then((s) => {
        res.status(200)
        res.send(s);
    }).catch((err) => {
        next(err);
    })
})

router.put('/', async (req, res, next) => {
    const salary_update = req.body;
    await Salary_query.update_salary(salary_update).then((s) => {
        res.status(200)
        res.send(s)
    }).catch((err) => {
        next(err);
    })
})

router.delete('/', async (req, res, next) => {
    const { salary_id } = req.query;
    await Salary_query.delete_salary(parseInt(salary_id)).then((s) => {
        res.status(200)
        res.send(s)
    }).catch((err) => {
        next(err)
    })
})

router.get('/', async (req, res, next) => {
    const { salary_id } = req.query;
    await Salary_query.get_salary(parseInt(salary_id)).then((s) => {
        res.status(200)
        res.send(s)
    }).catch((err) => {
        next(err)
    })
})

router.get('/all', async (req, res, next) => {
    await Salary_query.get_all_salary().then((s)=>{
        res.status(200)
        res.send(s)
    }).catch((err)=>{
        next(err)
    })
})

module.exports = router;