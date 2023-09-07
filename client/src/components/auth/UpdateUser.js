import React from 'react'
import Button from '../Button'
import { connect } from 'react-redux'
import { sendMessage } from '../../redux/actions/authActions'
import DeleteUserModal from "../auth/DeleteUserModal"
import API from "../../utils/API"

class UpdateUser extends React.Component {
  constructor(props) {
      console.log("UPDATE USER PROPS ", props)
        super(props)
        this.state = {
            _id: '',
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
            deleteUser: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleDeleteUser = this.handleDeleteUser.bind(this)
    }
    handleChange(e) {
        let { name, value } = e.target
        this.setState({
            ...this.state,
            [name]: value
        })
    }
    handleSubmit(e) {
        e.preventDefault()
        API.update(this.state)
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
    handleDeleteUser(){
       this.setState( prevState => {
          return {
              deleteUser: !prevState.deleteUser
          }
       })
    }
    componentDidMount() {
        this.props.sendMessage("")
        // this.setState({
        //     _id: this.props.authState.user._id,
        //     firstName: this.props.authState.user.firstName,
        //     lastName: this.props.authState.user.lastName,
        //     email: this.props.authState.user.email,
        //     securityQuestion1: this.props.authState.user.securityQuestion1,
        //     securityQuestion2: this.props.authState.user.securityQuestion2,
        //     securityQuestion3: this.props.authState.user.securityQuestion3,
        //     securityAnswer1: this.props.authState.user.securityAnswer1,
        //     securityAnswer2: this.props.authState.user.securityAnswer2,
        //     securityAnswer3: this.props.authState.user.securityAnswer3,
        // })
    }
    componentWillUnmount(){
        this.props.sendMessage("")
    }
    render() {
        return (
            <div className="form-wrapper update-user-wrapper">
                <h3>Update User</h3>
                <form onSubmit={this.handleSubmit}>
                    <input name="firstName" value={this.state.firstName} onChange={this.handleChange} placeholder="First name" />
                    <input name="lastName" value={this.state.lastName} onChange={this.handleChange} placeholder="Last name" />
                    <input name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email" />
                    <input name="password1" value={this.state.password1} onChange={this.handleChange} placeholder="Password" />
                    <input name="password2" value={this.state.password2} onChange={this.handleChange} placeholder="Reenter Password" />
                    <input name="securityQuestion1" value={this.state.securityQuestion1} onChange={this.handleChange} placeholder="Create Security Question#1" />
                    <input name="securityAnswer1" value={this.state.securityAnswer1} onChange={this.handleChange} placeholder="Security Answer#1" />
                    <input name="securityQuestion2" value={this.state.securityQuestion2} onChange={this.handleChange} placeholder="Create Security Question#2" />
                    <input name="securityAnswer2" value={this.state.securityAnswer2} onChange={this.handleChange} placeholder="Security Answer#2" />
                    <input name="securityQuestion3" value={this.state.securityQuestion3} onChange={this.handleChange} placeholder="Create Security Question#3" />
                    <input name="securityAnswer3" value={this.state.securityAnswer3} onChange={this.handleChange} placeholder="Security Answer#3" />
                    <Button type="submit" label="UPDATE" />
                </form>
                <div className="delete-user-div">
                    {!this.state.deleteUser ? <Button type="button" handleClick={this.handleDeleteUser} className="update-delete" label="DELETE USER " /> : <DeleteUserModal handleDeleteUser={this.handleDeleteUser}/>}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  console.log("UpdateUser State", state.auth)
    return {
        authState: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage : (message)=>dispatch(sendMessage(message))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser)