import { connect } from 'react-redux'
import { noHamburger, openMenu } from '../../redux/actions/appActions'

const Hamburger = (props) =>{
    const clickHam = () =>{
        props.noHamburger()
        props.openMenu()
    }
    return (
        <span className="hamburger" onClick={clickHam}>
            <span className="patty"></span>
            <span className="patty"></span>
            <span className="patty"></span>
            <span className="patty"></span>
        </span>
    )
}

const mapDispatchToProps = (dispatch) =>{
    return {
        noHamburger: ()=>dispatch(noHamburger()),
        openMenu: ()=>dispatch(openMenu())
    }
}

export default connect(null, mapDispatchToProps)(Hamburger)