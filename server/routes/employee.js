const express = require('express')
const { Employee, validate } = require('../model/Employee')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    let employees = await Employee.find({})
    res.send(employees)
  } catch (err) {
    console.log(err)
    res.send('Something went wrong')
  }
})

router.post('/', async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let employee = new Employee(req.body)
  try {
    await employee.save()
    res.send('Success')
  } catch (err) {
    console.log(err)
    res.send('Something went wrong')
  }
})

router.put('/:id', async (req, res) => {
  let { _id, name, gender, age, designation, department, joiningDate, available } = req.body
  try {
    await Employee.findOne({ _id: req.params.id })
  } catch (err) {
    console.log(err)
    res.send('Something went wrong')
  }

  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  await Employee.updateOne(
    { _id: req.params.id },
    { name, gender, age, designation, department, joiningDate, available },
    err => {
      if (err) {
        console.log(err)
        res.stasend('Something went wrong')
      }
      res.send('Success')
    }
  )
})

router.delete('/:id', async (req, res) => {
  try {
    await Employee.deleteOne({ _id: req.params.id })
    res.send('Success')
  } catch (err) {
    console.log(err)
    res.send('Something went wrong')
  }
})

module.exports = router
