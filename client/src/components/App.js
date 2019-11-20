import React, { Component } from 'react'
import axios from 'axios'
import Dashboard from './Dashboard'
import AddEmployeeModal from './AddEmplyeeModal'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      employees: [],
      editEmployee: {
        name: '',
        gender: '',
        age: '',
        designation: '',
        department: '',
        joiningDate: '',
        available: true
      },
      modal: 'add',
      editEmployeeIndex: null,
      availableEmp: 0
    }
  }

  calculateAvailableEmp = employees => {
    let count = 0
    employees.forEach(emp => {
      if (emp.available === true) count++
    })
    return count
  }

  componentDidMount = async () => {
    let employees = await axios.get('/api/employee')
    employees = employees.data
    const availableEmp = this.calculateAvailableEmp(employees)
    this.setState({ employees, availableEmp })
  }

  addModalSubmit = employees => {
    this.setState({ employees })
  }

  handleAddBtnClick = () => {
    this.setState({
      editEmployee: {
        name: '',
        gender: 'Select',
        age: '',
        designation: '',
        department: '',
        joiningDate: '',
        available: true
      },
      modal: 'add'
    })
  }

  handleEditBtnClick = (emp, index) => {
    this.setState({ editEmployee: emp, modal: 'edit', editEmployeeIndex: index })
  }

  handleChangeModal = (key, value) => {
    let employee = this.state.editEmployee
    employee[key] = value
    this.setState({ editEmployee: employee })
  }

  handleDeleteBtn = async id => {
    await axios.delete(`/api/employee/${id}`)
    this.componentDidMount()
  }

  handleCheckBox = async emp => {
    emp.available = !emp.available
    await axios.put(`/api/employee/${emp._id}`, emp)
    this.componentDidMount()
  }

  render = () => {
    return (
      <div>
        <Dashboard
          employees={this.state.employees}
          availableEmp={this.state.availableEmp}
          editBtnClick={this.handleEditBtnClick}
          addBtnClick={this.handleAddBtnClick}
          deleteBtnClick={this.handleDeleteBtn}
          checkBoxClick={this.handleCheckBox}
        />
        <AddEmployeeModal
          submit={this.addModalSubmit}
          employee={this.state.editEmployee}
          modal={this.state.modal}
          change={this.handleChangeModal}
          index={this.state.editEmployeeIndex}
        />
      </div>
    )
  }
}
