const mongoose = require('mongoose')
const Joi = require('@hapi/joi')

const employeeSchema = new mongoose.Schema({
  name: String,
  gender: String,
  age: Number,
  designation: String,
  department: String,
  joiningDate: String,
  available: Boolean
})

const Employee = mongoose.model('Employee', employeeSchema)

validateEmployee = employee => {
  const schema = Joi.object({
    name: Joi.string().required(),
    gender: Joi.string().required(),
    age: Joi.number().required(),
    designation: Joi.string().required(),
    department: Joi.string().required(),
    joiningDate: Joi.string().required(),
    available: Joi.boolean().required()
  })
  return schema.validate(employee)
}

module.exports.Employee = Employee
module.exports.validate = validateEmployee
