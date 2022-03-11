const express = require('express')
const Employee = require('../models/employee')
const router = new express.Router()

//POST METHOD : Create employee API
router.post('/employees', async (req, res) => {
    const employee = new Employee(req.body)
    try {
        await employee.save()
        res.status(201).send(employee)
    } catch (e) {
        res.status(400).send(e)
    }
})

//GET METHOD : Get employees with pagination & filtering by name
router.get('/employees', async (req, res) => {
    try {
        var query ={}
        if(req.query.name){
        query = {name:req.query.name}
        }
        const employees = await Employee.find(query)
            .limit(parseInt(req.query.limit))
            .skip(parseInt(req.query.skip))
            .exec();
        res.send(employees)
    } catch (e) {
        res.status(500).send()
    }
})

//GET METHOD: Get employee by ID
router.get('/employees/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const employee = await Employee.findById(_id)

        if (!employee) {
            return res.status(404).send()
        }

        res.send(employee)
    } catch (e) {
        res.status(500).send()
    }
})

//UPDATE METHOD: update employee by ID
router.patch('/employees/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
   try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!employee) {
            return res.status(404).send()
        }
        res.send(employee)
    } catch (e) {
        res.status(400).send(e)
    }
})

// DELETE METHOD :delete employee by id
router.delete('/employees/:id', async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id)
        if (!employee) {
            return res.status(404).send()
        }
        res.status(204).send(employee)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router



//GET METHOD: without pagination and filter
// router.get('/employees', async (req, res) => {
//     try {
//         const employees = await Employee.find({})
//         res.send(employees)
//     } catch (e) {
//         res.status(500).send()
//     }
// })





