import Button from '../Button'
import Modal from '../Modal'
import { connect } from 'react-redux'
import { openModal, closeModal } from '../../redux/actions/authActions'
import LoginForm from '../auth/LoginForm'
import RegistrationForm from '../auth/RegistrationForm'

const InitNav = (props) => {
    return(
        <nav className="init-nav">
            { props.authState.modalOpen ? <Modal type="double" element={<LoginForm />} element2={<RegistrationForm />} handleClick={props.closeModal}/> :
            <Button type="button" className="nav-login-button" handleClick={props.openModal} label="LOGIN" /> }
        </nav>
    )
}

const mapStateToProps = (state) =>{
    return {
        authState: state.auth
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        openModal: ()=>dispatch(openModal()),
        closeModal: ()=>dispatch(closeModal())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InitNav)