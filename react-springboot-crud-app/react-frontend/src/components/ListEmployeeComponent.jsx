import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';


class ListEmployeeComponent extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            employees: []
        }
        this.editEmployee = this.editEmployee.bind(this);
        this.addEmployee = this.addEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.viewEmployee = this.viewEmployee.bind(this);


    }

    viewEmployee(id){
        this.props.navigate('/view-employee/' + id);
    }

    deleteEmployee(id){
        EmployeeService.deleteEmployee(id).then(res => {
            this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
        });
    }

    addEmployee(){
        this.props.navigate('/add-employee');
    }
    editEmployee(id){
        this.props.navigate('/update-employee/' + id);
    }
    

    componentDidMount(){
        EmployeeService.getEmployees().then((res) =>{
            this.setState({employees: res.data});
        });
    }

    

    render() {
        return (
            <div>
                <h2 className='text-center'>Employees List</h2>   
                <div className='row'>
                    <button className='btn btn-primary' onClick={this.addEmployee}>Add Employee</button>
                </div>
                <br></br>
                <div className='row'>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th> Employee first name</th>
                                <th> Employee last name</th>
                                <th> Employee email id</th>
                                <th> Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.employees.map(
                                    employee =>
                                    <tr key = {employee.id}>
                                        <td>{employee.firstName}</td>
                                        <td>{employee.lastName}</td>
                                        <td>{employee.emailID}</td>
                                        <td>
                                            <button onClick={ () => this.editEmployee(employee.id)} className="btn btn-info">Update</button>
                                            <button style = {{marginLeft: "10px"}} onClick={ () => this.deleteEmployee(employee.id)} className="btn btn-danger">Delete</button>
                                            <button style = {{marginLeft: "10px"}} onClick={ () => this.viewEmployee(employee.id)} className="btn btn-info">View</button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        );
    }
}

function WithNavigate(props){
    const navigate = useNavigate();
    return <ListEmployeeComponent {...props} navigate={navigate}/>
}


export default WithNavigate;