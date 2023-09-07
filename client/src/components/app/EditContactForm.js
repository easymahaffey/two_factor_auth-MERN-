import React from 'react'
import { connect } from 'react-redux'
import API from "../../utils/API"
import SmallEditContactForm from './SmallEditContactForm'
import LargeEditContactForm from './LargeEditContactForm'

class EditContactForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            _id: "",
            userId: "",
            firstName: "",
            lastName: "",
            email_label: "",
            email: "",
            email_2_label: "",
            email_2: "",
            phone_label: "",
            phone: "",
            phone_2_label: "",
            phone_2: "",
            address: "",
            other: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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
        API.editContact(this.state)
        this.props.handleClick()
        this.setState({
            _id: "",
            userId: "",
            firstName: "",
            lastName: "",
            email_label: "",
            email: "",
            email_2_label: "",
            email_2: "",
            phone_label: "",
            phone: "",
            phone_2_label: "",
            phone_2: "",
            address: "",
            other: ""
        })
    }
    componentDidMount() {
        this.setState({
            _id: this.props.contact._id,
            userId: this.props.contact.userId,
            firstName: this.props.contact.firstName,
            lastName: this.props.contact.lastName,
            email_label: this.props.contact.email_label,
            email: this.props.contact.email,
            email_2_label: this.props.contact.email_2_label,
            email_2: this.props.contact.email_2,
            phone_label: this.props.contact.phone_label,
            phone: this.props.contact.phone,
            phone_2_label: this.props.contact.phone_2_label,
            phone_2: this.props.contact.phone_2,
            address: this.props.contact.address,
            other: this.props.contact.other
        })
    }
    render() {
        return (
            this.props.authState.window <= 500 ? <SmallEditContactForm handleChange={this.handleChange} state={this.state} handleSubmit={this.handleSubmit} /> : <LargeEditContactForm handleChange={this.handleChange} state={this.state} handleSubmit={this.handleSubmit} /> 
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authState: state.auth
    }
}

export default connect(mapStateToProps, null)(EditContactForm)