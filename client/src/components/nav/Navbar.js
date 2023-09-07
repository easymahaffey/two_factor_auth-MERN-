import { connect } from 'react-redux'
import { windowResize } from '../../redux/actions/authActions'
import InitNav from './InitNav'
import LargeAuthNav from './LargeAuthNav'
import SmallAuthNav from './SmallAuthNav'

const Navbar = (props) => {
    window.addEventListener("resize", props.windowResize)
    return (
        !props.authState.isAuth ? <InitNav /> : props.authState.window <= 500 ? <SmallAuthNav /> : <LargeAuthNav />
    )
}

const mapStateToProps = (state) => {
    return {
        authState: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        windowResize: () => dispatch(windowResize())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)