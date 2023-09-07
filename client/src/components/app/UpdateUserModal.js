import React from 'react'
import { connect } from 'react-redux'
import { openModal, closeModal } from '../../redux/actions/authActions'
import UpdateUser from "../auth/UpdateUser"
import Button from "../Button"
import Model from "../Modal"

const UpdateUserModal = (props) => {
    return (
        <React.Fragment>
            {props.authState.modalOpen ? <Model handleClick={props.closeModal} element={<UpdateUser />} type="single" /> : <Button type="button" handleClick={props.openModal} label="UPDATE PROFILE" />}
            <p>{ props.authState.message }</p>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        authState: state.auth,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        openModal: () => dispatch(openModal()),
        closeModal: () => dispatch(closeModal())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserModal)