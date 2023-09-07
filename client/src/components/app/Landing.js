import React from "react"
import Contacts from "./Contacts"
import { getContacts } from "../../redux/actions/appActions"
import { connect } from 'react-redux'
import API from "../../utils/API"

class Landing extends React.Component {
  componentDidMount() {
    API.bringInContacts(this.props.authState.user._id)
  }
  render() {
    return (
      <div className='contacts-wrapper'>
        <h3>Record this number for next login <em><b>{this.props.authState.user.loginToken}</b></em></h3>
        <h1>Contacts</h1>
        <Contacts />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authState: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getContacts: (contacts) => dispatch(getContacts(contacts))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing)