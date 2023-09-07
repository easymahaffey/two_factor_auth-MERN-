import React from 'react'
import Button from '../Button'
import { connect } from 'react-redux'
import { toggleForm, sendMessage, toggleToken, toggleQuestion } from '../../redux/actions/authActions'
import { auth2Token } from '../../utils/auth2Token'
import API from '../../utils/API'
import TokenRequestForm from './TokenRequestForm'

class LoginForm extends React.Component {
  constructor(props) {
    console.log("LOGIN Form Props ", props)
    super(props)
    this.state = {
      email: '',
      password: '',
      loginToken: '',
      securityAnswer1: "",
      securityAnswer2: "",
      securityAnswer3: "",
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e) {
    let { name, value } = e.target
    this.setState({
      ...this.state,
      [name]: value
    })
  }
  handleSubmit(e) {
    !this.props.authState.toggleToken && !this.props.authState.toggleQuestion ?
      (
        e.preventDefault(),
        // Normal Login
        API.loginToken(this.state.loginToken),
        auth2Token(this.state.loginToken).test ?
          API.login(this.state)
          : null,
        this.setState({
          ...this.state,
          email: '',
          password: '',
          loginToken: '',
          securityAnswer1: "",
          securityAnswer2: "",
          securityAnswer3: "",
        })
      ) : this.props.authState.toggleToken && !this.props.authState.toggleQuestion ? (
        e.preventDefault(),
        // Request Questions
        API.securityQuestion(this.state),
        this.state.loginToken = "newToken"
      ) : !this.props.authState.toggleToken && this.props.authState.toggleQuestion ? (
        e.preventDefault(),
        // Send Answers And Request Token
        API.requestToken(this.state),
        this.setState({
          ...this.state,
          email: '',
          password: '',
          loginToken: '',
          securityAnswer1: "",
          securityAnswer2: "",
          securityAnswer3: "",
        })
      ) : null
  }
  componentDidMount() {
    this.props.sendMessage('')
  }
  render() {
    return (
      <div className="form-wrapper">
        {
          this.props.authState.toggleToken && !this.props.authState.toggleQuestion ? (
            <React.Fragment>
              <h3>Request Token</h3>
              <form onSubmit={this.handleSubmit}>
                <input name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email" />
                <input name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />
                <input name="loginToken" value="newToken" onChange={this.handleChange} hidden />
                <Button type="submit" label="SEND TOKEN REQUEST" />
              </form>
            </React.Fragment>
          ) : !this.props.authState.toggleToken && this.props.authState.toggleQuestion ? (
            
            <React.Fragment>
              <h3>Answer Security Questions</h3>
              <form onSubmit={this.handleSubmit}>
                <label>Question #1: {this.props.authState.securityQuestion1}?</label><br />
                <input name="securityAnswer1" value={this.state.securityAnswer1} onChange={this.handleChange} placeholder="Security Answer#1" /><br />
                <label>Question #2: {this.props.authState.securityQuestion2}?</label><br />
                <input name="securityAnswer2" value={this.state.securityAnswer2} onChange={this.handleChange} placeholder="Security Answer#2" /><br />
                <label>Question #3: {this.props.authState.securityQuestion3}?</label><br />
                <input name="securityAnswer3" value={this.state.securityAnswer3} onChange={this.handleChange} placeholder="Security Answer#3" /><br />
                <Button id="securityButton" type="submit" label="SUBMIT SECURITY ANSWERS" />
              </form>
                {/* <TokenRequestForm /> */}
            </React.Fragment>
            ) : (
            <React.Fragment>
              <h3>Login</h3>
              <form onSubmit={this.handleSubmit}>
                <input name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email" />
                <input name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />
                <input name="loginToken" value={this.state.loginToken} onChange={this.handleChange} placeholder="Login Token" />
                <Button type="submit" label="LOGIN" />
              </form>
            </React.Fragment>
          )

        }
        <div className="modal-message-div">
          <p>{this.props.authState.message}</p>
        </div>
        {this.props.authState.toggleToken && !this.props.authState.toggleQuestion ? <Button type="button" handleClick={this.props.toggleToken} label="LOGIN" /> : !this.props.authState.toggleToken && this.props.authState.toggleQuestion ? <Button type="button" handleClick={this.props.toggleToken} label="LOGIN" /> : <Button id="token" type="button" handleClick={this.props.toggleToken} label="REQUEST NEW TOKEN" />}
        <Button type="button" handleClick={this.props.toggleForm} label="REGISTER" />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authState: state.auth,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleForm: () => dispatch(toggleForm()),
    toggleToken: () => dispatch(toggleToken()),
    toggleQuestion: () => dispatch(toggleQuestion()),
    sendMessage: () => dispatch(sendMessage()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)