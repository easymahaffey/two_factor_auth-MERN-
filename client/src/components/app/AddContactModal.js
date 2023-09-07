import React from 'react'
import { connect } from 'react-redux'
import { openContactModal, closeContactModal } from '../../redux/actions/appActions'
import AddContactForm from '../app/AddContactForm'
import Button from "../Button"
import Model from "../Modal"

const AddContactModal = (props) => {
    return (
        <React.Fragment>
            {props.appState.addContactModal ? <Model handleClick={props.closeContactModal} element={<AddContactForm />} type="single" /> : <Button type="button" handleClick={props.openContactModal} label="ADD CONTACT" />}
        </React.Fragment>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        openContactModal: () => dispatch(openContactModal()),
        closeContactModal: () => dispatch(closeContactModal()),
    }
}

const mapStateToProps = (state) =>{
    return {
        appState: state.app
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddContactModal)