import { connect } from "react-redux"
import React from 'react'
import Menu from './Menu'
import MenuModal from './MenuModal'

const MenuToggle = (props) =>{
    return (
        <React.Fragment >
           { props.appState.menu  ? <Menu /> : <MenuModal /> }
        </React.Fragment>
    )
}

const mapStateToProps = (state) =>{
   return {
      appState : state.app 
   } 
}

export default connect(mapStateToProps, null)(MenuToggle)