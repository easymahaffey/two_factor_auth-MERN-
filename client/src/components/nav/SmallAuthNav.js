import { connect } from 'react-redux'
import Hamburger from './Hamburger'
import MenuToggle from './MenuToggle'

const SmallAuthNav = (props) =>{
    return (
        <nav>
            { props.appState.hamburger ? <Hamburger /> : <MenuToggle /> }
        </nav>
    )
}

const mapStateToProps = (state) =>{
    return {
        appState: state.app
    }
}

export default connect(mapStateToProps, null)(SmallAuthNav)