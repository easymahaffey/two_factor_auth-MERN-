import React from 'react'
import { connect } from "react-redux"
import ContactCard from "./ContactCard"

const Contacts = (props) => {
    return (
        <div className="contacts-envelope">
            {props.appState.contacts.map(contact => <ContactCard contact={contact} key={contact._id} />)}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        appState: state.app
    }
}

export default connect(mapStateToProps, null)(Contacts)