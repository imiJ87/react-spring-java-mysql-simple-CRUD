import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export function withRouter(Children){
    return(props)=>{

       const match  = {params: useParams()};
       const navigate = useNavigate();
       return <Children {...props}  match = {match} navigate={navigate}/>
   }
 }

class UpdateEmployeeComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            id : this.props.match.params.id,
            firstName: '',
            lastName: '',
            emailID: ''
        };
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);

        

    }

    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.id).then((res) => {
            let employee = res.data;
            this.setState({firstName: employee.firstName,
            lastName: employee.lastName,
            emailID : employee.emailID
            });
        });
    }

    updateEmployee = (e) =>{
        e.preventDefault();
        let employee = {firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        emailID: this.state.emailID};
        console.log('employee => '+ JSON.stringify(employee));

        EmployeeService.updateEmployee(employee, this.state.id).then( res => {
            this.props.navigate('/employee');
        })


    }
    changeFirstNameHandler=(event) =>{
        this.setState({firstName: event.target.value})
    }

    changeLastNameHandler=(event) =>{
        this.setState({lastName: event.target.value})
    }

    changeEmailHandler=(event) =>{
        this.setState({emailID: event.target.value})
    }


    render() {
        return (
            <div>

                <div className='container'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'>
                            <h3 className='text-center'>Update Employee</h3>
                            <div className='card-body'>
                                <form>
                                    <div className='form-group'>
                                        <label > First Name</label>
                                        <input placeholder='First Name' name='firstName' className='form-control' 
                                        value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                    </div>
                                    <div className='form-group'>
                                        <label > Last Name</label>
                                        <input placeholder='Last Name' name='LastName' className='form-control' 
                                        value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                    </div>
                                    <div className='form-group'>
                                        <label > Email Address</label>
                                        <input placeholder='Email Address' name='emailID' className='form-control' 
                                        value={this.state.emailID} onChange={this.changeEmailHandler}/>
                                    </div>
                                    <button className='btn btn-success' onClick={this.updateEmployee}>Save</button>
                                    <button className='btn btn-danger' style = {{marginLeft: "10px"}}><Link to = {"/employee"}> Cancel</Link></button>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>


            </div>
        );
    }
}



export default withRouter(UpdateEmployeeComponent);