import React from 'react'
import { connect } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoute = (props) => {
    return (
        <React.Fragment>
            {props.authState.isAuth ? <Outlet /> : <Navigate to="/" />}
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        authState: state.auth
    }
}

export default connect(mapStateToProps, null)(PrivateRoute)