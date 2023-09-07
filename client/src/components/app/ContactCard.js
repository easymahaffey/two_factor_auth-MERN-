import React from 'react'
import CardHeader from "./CardHeader"
import CardBtnSpan from './CardBtnSpan'
import CardBody from './CardBody'
import EditContactForm from './EditContactForm'
import Modal from '../Modal'
import API from '../../utils/API'

class ContactCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isHeader: true,
            isEdit: false
        }
        this.toggleHeader = this.toggleHeader.bind(this)
        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
    }
    toggleHeader() {
        this.setState(prevState => {
            return {
                ...this.state,
                isHeader: !prevState.isHeader
            }
        })
    }
    openEdit(){
        this.setState({
            ...this.state,
            isEdit : true
        })
    }
    closeEdit(){
        this.setState({
            ...this.state,
            isEdit : false
        })
    }
    render() {
        return (
            <div className="card-div-wrapper">
                {
                    this.state.isHeader ?
                        <div className="card-display-header">
                            {/* <CardHeader contact={this.props.contact} /> */}
                            <CardBtnSpan buttons={[{ handleClick: this.toggleHeader, label: `${this.props.contact.firstName} ${this.props.contact.lastName}` }]} />
                        </div>
                        :
                    this.state.isEdit ?
                        <Modal element={< EditContactForm contact={this.props.contact} handleClick={this.closeEdit} />} handleClick={this.closeEdit}/>
                        :
                        <div className="card">
                            <CardHeader contact={this.props.contact} /> 
                            <CardBtnSpan buttons={[{ handleClick: this.toggleHeader, label: "less"},{ handleClick: this.openEdit, label: "edit" }, { handleClick: ()=>API.deleteContact(this.props.contact._id), label: "delete"}]} />
                            <CardBody contact={this.props.contact} />
                        </div>
                }
            </div>
        )
    }

}


export default ContactCard