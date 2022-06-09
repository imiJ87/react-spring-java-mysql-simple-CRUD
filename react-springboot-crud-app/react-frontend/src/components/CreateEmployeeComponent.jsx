import React, { Component } from 'react';
import EmployeeService
 from '../services/EmployeeService';
 import { Link } from 'react-router-dom';
 import { useNavigate } from 'react-router-dom';
 import { useParams } from 'react-router-dom';


 export function withRouter(Children){
    return(props)=>{

       const match  = {params: useParams()};
       const navigate = useNavigate();
       return <Children {...props}  match = {match} navigate={navigate}/>
   }} 
//spoji updejt sa ovim kodom ovde tutrijal broj 20 reactjs + spingboot
class CreateEmployeeComponent extends Component {

    constructor(props){
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            emailID: ''
        };
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.saveEmployee = this.saveEmployee.bind(this);

        

    }

    saveEmployee = (e) =>{
        e.preventDefault();
        let employee = {firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        emailID: this.state.emailID};
        console.log('employee => '+ JSON.stringify(employee));
        EmployeeService.createEmployee(employee).then(res => {
            this.props.navigate('/employee');
        });


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
                            <h3 className='text-center'>Add Employee</h3>
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
                                    <button className='btn btn-success' onClick={this.saveEmployee}><Link to = {"/employee"}> Save</Link></button>
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

export default withRouter(CreateEmployeeComponent);