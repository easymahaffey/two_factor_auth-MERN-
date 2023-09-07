import { connect } from 'react-redux'

const UserSpan = (props) => {
    return (
        <span className="user-span">{ props.authState.user.firstName} {props.authState.user.lastName}</span>
    )
}

const mapStateToProps = (state) =>{
    return {
        authState: state.auth
    }
}

export default connect(mapStateToProps, null)(UserSpan)