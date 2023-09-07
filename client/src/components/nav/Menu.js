import UserSpan from './UserSpan'
import Button from '../Button'
import { getHamburger, openContactModal, closeMenu } from '../../redux/actions/appActions'
import { openModal } from '../../redux/actions/authActions'
import { connect } from 'react-redux'
import API from "../../utils/API"

const Menu = (props) =>{
    const gotoAC = () =>{
        props.openContactModal()
        props.closeMenu()
    }
    const gotoUU = () =>{
        props.openModal()
        props.closeMenu()
    }
    return (   
        <div className="menu-wrapper" >
            <UserSpan />
            <Button type="button" label="ADD CONTACT" handleClick={gotoAC}/>
            <Button type="button" label="UPDATE USER" handleClick={gotoUU}/>
            <Button type="button" label="LOGOUT" className="menu-logout-btn" handleClick={API.logout}/>
            <Button type="button" handleClick={props.getHamburger} label="CLOSE MENU" className="close-menu-btn"/>
        </div>
    )
}

const mapDispatchToProps = (dispatch) =>{
    return {
        getHamburger: ()=>dispatch(getHamburger()),
        openModal: ()=>dispatch(openModal()),
        openContactModal: ()=>dispatch(openContactModal()),
        closeMenu: ()=>dispatch(closeMenu())
    }
}

export default connect(null, mapDispatchToProps)(Menu)