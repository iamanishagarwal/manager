import React, { Component } from 'react'
import axios from 'axios'

export default class Dashboard extends Component {
  state = {
    employees: [],
    availableEmp: 0
  }

  calculateAvailableEmp = employees => {
    let count = 0
    employees.forEach(emp => {
      if (emp.available === true) count++
    })
    return count
  }

  static getDerivedStateFromProps(props, state) {
    if (
      JSON.stringify(props.employees) !== JSON.stringify(state.employees) ||
      props.availableEmp !== state.availableEmp
    ) {
      return {
        employees: props.employees,
        availableEmp: props.availableEmp
      }
    }
    return null
  }

  componentDidMount = async () => {
    let employees = await axios.get('/api/employee')
    employees = employees.data
    let availableEmp = this.calculateAvailableEmp(employees)
    this.setState({ employees, availableEmp })
  }

  renderEmployees = () => {
    let results = this.state.employees
    if (results.length === 0) return null
    else {
      results = results.map(emp => {
        return (
          <tr key={emp._id}>
            <td>{emp.name}</td>
            <td>{emp.department}</td>
            <td>
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id={emp._id}
                  checked={emp.available}
                  onChange={() => this.props.checkBoxClick(emp)}
                />
                <label className="custom-control-label" htmlFor={emp._id}></label>
              </div>
            </td>
            <td>
              <button
                type="button"
                className="btn btn-outline-info btn-sm"
                data-toggle="modal"
                data-target="#addEmployeeModal"
                onClick={() => {
                  this.props.editBtnClick(emp, emp._id)
                }}
              >
                <i className="fa fa-edit"></i>&nbsp; Edit
              </button>
              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={() => this.props.deleteBtnClick(emp._id)}
              >
                <i className="fa fa-trash"></i>&nbsp; Delete
              </button>
            </td>
          </tr>
        )
      })
      return results
    }
  }

  render = () => {
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="question-dashboard">
                <div className="card mt-4 mb-3 mb-md-4">
                  <div className="card-body p-3">
                    <h5 className="text-secondary mb-2">
                      Available: <span className="font-weight-bold ml-1 text-dark">{this.state.availableEmp}</span>
                    </h5>
                    <h5 className="text-secondary">
                      Total: <span className="font-weight-bold ml-1 text-dark">{this.state.employees.length}</span>
                    </h5>
                    ​
                    <button
                      className="btn btn-primary mt-4"
                      data-toggle="modal"
                      data-target="#addEmployeeModal"
                      onClick={this.props.addBtnClick}
                    >
                      <i className="fa fa-plus"></i>&nbsp; Add Employee
                    </button>
                  </div>
                </div>
                ​
                <div className="table-responsive mt-3 mt-md-4 mb-2">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Available</th>
                        <th>View Details</th>
                      </tr>
                    </thead>
                    <tbody>{this.renderEmployees()}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
