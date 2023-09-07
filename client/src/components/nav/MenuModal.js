import React from 'react'
import { connect } from 'react-redux'
import { getHamburger, closeContactModal, closeMenu } from '../../redux/actions/appActions'
import { closeModal } from '../../redux/actions/authActions'
import UpdateUser from '../auth/UpdateUser'
import AddContactForm from '../app/AddContactForm'
import Modal from '../Modal'

const MenuModal = (props) => {
    const closeUU = () =>{
        props.closeModal()
        props.getHamburger()
        props.closeMenu()
    }
    const closeAC = () =>{
        props.closeContactModal()
        props.getHamburger()
        props.closeMenu()
    }
    return (
        <React.Fragment>
            { !props.authState.modalOpen && props.appState.addContactModal && <Modal element={<AddContactForm />} handleClick={closeAC}/> }
            { !props.appState.addContactModal && props.authState.modalOpen && <Modal element={<UpdateUser />} handleClick={closeUU}/> }
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        authState: state.auth,
        appState: state.app
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getHamburger : ()=>dispatch(getHamburger()),
        closeModal: ()=>dispatch(closeModal()),
        closeContactModal: ()=>dispatch(closeContactModal()),
        closeMenu: ()=>dispatch(closeMenu())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuModal)