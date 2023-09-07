import React from 'react'
import Button from '../Button'
import { connect } from 'react-redux'
import { toggleToken, sendMessage } from '../../redux/actions/authActions'
import API from "../../utils/API"

class TokenRequestForm extends React.Component {
  constructor(props) {
    console.log("TokenRequestForm Props ", props)
    super(props)
    this.state = {
      email: props.email,
      password: props.password,
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
  handleChange(e) {
    let { name, value } = e.target
    this.setState({
      ...this.state,
      [name]: value
    })
  }
  handleSubmit(e) {
    e.preventDefault()
    API.securityQuestion(this.state)
    API.login(this.state)
    this.setState({
      ...this.state,
      email: '',
      password: '',
      securityQuestion1: "",
      securityQuestion2: "",
      securityQuestion3: "",
      securityAnswer1: "",
      securityAnswer2: "",
      securityAnswer3: "",
    })
  }
  componentDidMount() {
    this.props.sendMessage('')
  }
  render() {
    return (
      <React.Fragment>
        <h3>Answer All Security Questions</h3>
        {console.log("TR Form Props ", this.props)}
        <form onSubmit={this.handleSubmit}>
          {/* <input name="email" value={this.props.authState.user.email} hidden readOnly />
          <input name="password" value={this.props.authState.user.password} hidden readOnly />
          <input name="loginToken" value={this.props.authState.user.loginToken} hidden readOnly /> */}

          {/* <input name="securityQuestion1" value={this.state.securityQuestion1} onChange={this.handleChange} placeholder="Create Security Question#1" /> */}
          <label>Question #1: {this.props.authState.securityQuestion1}?</label><br />
          <input name="securityAnswer1" value={this.state.securityAnswer1} onChange={this.handleChange} placeholder="Security Answer#1" /><br />
          {/* <input name="securityQuestion2" value={this.state.securityQuestion2} onChange={this.handleChange} placeholder="Create Security Question#2" /> */}
          <label>Question #2: {this.props.authState.securityQuestion2}?</label><br />
          <input name="securityAnswer2" value={this.state.securityAnswer2} onChange={this.handleChange} placeholder="Security Answer#2" /><br />
          {/* <input name="securityQuestion3" value={this.props.authState.securityQuestion3} onChange={this.handleChange} placeholder="Create Security Question#3" /> */}
          <label>Question #3: {this.props.authState.securityQuestion3}?</label><br />
          <input name="securityAnswer3" value={this.state.securityAnswer3} onChange={this.handleChange} placeholder="Security Answer#3" /><br />
          <Button id="securityButton" type="submit" label="SUBMIT SECURITY ANSWERS" />
          {/* <input id="securityButton" type="submit" label="SUBMIT MORE SECURITY ANSWERS" /> */}
        </form>
        <div className="modal-message-div">
          <p>{this.props.authState.message}</p>
        </div>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleToken: () => dispatch(toggleToken()),
    sendMessage: () => dispatch(sendMessage())
  }
}

const mapStateToProps = (state) => {
  console.log("TokenRequestForm State", state.auth)
  return {
    authState: state.auth
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TokenRequestForm)