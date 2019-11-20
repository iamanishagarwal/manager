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
      editEmployeeIndex: null
    }
  }

  componentDidMount = async () => {
    let employees = await axios.get('/api/employee')
    employees = employees.data
    console.log(employees)
    this.setState({ employees })
  }

  addModalSubmit = employees => {
    this.setState({ employees })
  }

  handleAddBtnClick = () => {
    this.setState({
      editEmployee: {
        name: '',
        gender: '',
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
    console.log(emp, index)
    this.setState({ editEmployee: emp, modal: 'edit', editEmployeeIndex: index })
  }

  handleChangeModal = (key, value) => {
    let employee = this.state.editEmployee
    employee[key] = value
    this.setState({ editEmployee: employee })
  }

  render = () => {
    return (
      <div>
        <Dashboard
          employees={this.state.employees}
          editBtnClick={this.handleEditBtnClick}
          addBtnClick={this.handleAddBtnClick}
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
