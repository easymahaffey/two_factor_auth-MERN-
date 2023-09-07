import React from 'react'
import Button from '../Button'
import { connect } from 'react-redux'
import { toggleForm, sendMessage } from '../../redux/actions/authActions'
import API from "../../utils/API"

class RegistrationForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password1: '',
            password2: '',
            securityQuestion1: "",
            securityQuestion2: "",
            securityQuestion3: "",
            securityAnswer1: "",
            securityAnswer2: "",
            securityAnswer3: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e){
        let { name, value } = e.target
        this.setState({
            ...this.state,
            [name]: value
        })
    }
    handleSubmit(e){
        e.preventDefault()
        API.register(this.state)
        this.setState({
            ...this.state,
            firstName: '',
            lastName: '',
            email: '',
            password1: '',
            password2: '',
            securityQuestion1: "",
            securityQuestion2: "",
            securityQuestion3: "",
            securityAnswer1: "",
            securityAnswer2: "",
            securityAnswer3: "",
        })
    }
    componentDidMount(){
        this.props.sendMessage('')
    }
    render(){
        return(
            <div className="form-wrapper">
                <h3>Register</h3>
                <form onSubmit={this.handleSubmit}>
                    <input name="firstName" value={this.state.firstName} onChange={this.handleChange} placeholder="First name"/>
                    <input name="lastName" value={this.state.lastName} onChange={this.handleChange} placeholder="Last name"/>
                    <input name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email"/>
                    <input name="password1" value={this.state.password1} onChange={this.handleChange} placeholder="Password"/>
                    <input name="password2" value={this.state.password2} onChange={this.handleChange} placeholder="Reenter Password"/>
                    <input name="securityQuestion1" value={this.state.securityQuestion1} onChange={this.handleChange} placeholder="Create Security Question#1" />
                    <input name="securityAnswer1" value={this.state.securityAnswer1} onChange={this.handleChange} placeholder="Security Answer#1" />
                    <input name="securityQuestion2" value={this.state.securityQuestion2} onChange={this.handleChange} placeholder="Create Security Question#2" />
                    <input name="securityAnswer2" value={this.state.securityAnswer2} onChange={this.handleChange} placeholder="Security Answer#2" />
                    <input name="securityQuestion3" value={this.state.securityQuestion3} onChange={this.handleChange} placeholder="Create Security Question#3" />
                    <input name="securityAnswer3" value={this.state.securityAnswer3} onChange={this.handleChange} placeholder="Security Answer#3" />
                    <Button type="submit" label="REGISTER" />
                </form>
                <div className="modal-message-div">
                    <p>{ this.props.authState.message }</p>
                </div>
                <Button type="button" handleClick={this.props.toggleForm} label="LOGIN" />
            </div>
            
        )
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        toggleForm: ()=>dispatch(toggleForm()),
        sendMessage: ()=>dispatch(sendMessage())
    }
}

const mapStateToProps = (state) =>{
    return {
        authState: state.auth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm)