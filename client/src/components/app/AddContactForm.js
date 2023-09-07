import React from 'react'
import { connect } from 'react-redux'
import Button from "../Button"
import API from "../../utils/API"

class AddContactForm extends React.Component{
    constructor(){
        super()
        this.state={
            userId: '',
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
    handleChange(e){
        let { name, value } = e.target
        this.setState({
            ...this.state,
            [name]: value
        })
    }
    handleSubmit(e){
        e.preventDefault()
        API.addContact(this.state)
        this.setState({
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
    componentDidMount(){
        this.setState({
            ...this.state,
            userId: this.props.authState.user._id
        })
    }
    render(){
        return(
            <div className="form-wrapper contact-form-wrapper">
                <h3>Add Contact</h3>
                <form onSubmit={this.handleSubmit}>
                    <input name="firstName" value={this.state.firstName} onChange={this.handleChange} placeholder="First Name" />
                    <input name="lastName" value={this.state.lastName} onChange={this.handleChange} placeholder="Last Name" />
                    <input name="email_label" value={this.state.email_label} onChange={this.handleChange} placeholder="Label for email" />
                    <input name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email" />
                    <input name="email_2_label" value={this.state.email_2_label} onChange={this.handleChange} placeholder="Label for second email" />
                    <input name="email_2" value={this.state.email_2} onChange={this.handleChange} placeholder="Secondary Email" />
                    <input name="phone_label" value={this.state.phone_label} onChange={this.handleChange} placeholder="Label for phone" />
                    <input name="phone" value={this.state.phone} onChange={this.handleChange} placeholder="Primary Phone" />
                    <input name="phone_2_label" value={this.state.phone_2_label} onChange={this.handleChange} placeholder="Second phone label" />
                    <input name="phone_2" value={this.state.phone_2} onChange={this.handleChange} placeholder="Second phone" />
                    <input name="address" value={this.state.address} onChange={this.handleChange} placeholder="Address" />
                    <textarea name="other" value={this.state.other} onChange={this.handleChange} placeholder="Notes:" />
                    <Button type="submit" label="ADD CONTACT" />
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authState: state.auth
    }
}

export default connect(mapStateToProps, null)(AddContactForm)