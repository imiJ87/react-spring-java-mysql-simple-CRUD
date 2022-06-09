import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';


export function withRouter(Children){
    return(props)=>{

       const match  = {params: useParams()};
       const navigate = useNavigate();
       return <Children {...props}  match = {match} navigate={navigate}/>
   }
}
class ViewEmployeeComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id : this.props.match.params.id,
            employee: {}
        }

    }

    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.id).then(res => {
            this.setState({employee: res.data});
        });

    }

    render() {
        return (
            <div>
                <br />
                <div className="card col-md-6 offset-md-3">
                    <h3 className="text-center">View Employee Details</h3>
                    <div className="card-body">
                        <div className="row">
                            <label>Employee First Name: </label>
                            <div> { this.state.employee.firstName }</div>
                        </div>
                        <div className="row">
                            <label>Employee Last Name: </label>
                            <div> { this.state.employee.lastName }</div>
                        </div>
                        <div className="row">
                            <label>Employee Email Id: </label>
                            <div> { this.state.employee.emailID }</div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ViewEmployeeComponent);