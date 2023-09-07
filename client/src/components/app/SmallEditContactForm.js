import Button from "../Button"

const SmallEditContactForm = (props) => {

    return (
        <div className="form-wrapper edit-contact-form-wrapper">
            <h3 className="sm-contact-edit-h3">Edit Contact</h3>
            <form onSubmit={props.handleSubmit}>
                <label>First Name
                    <input name="firstName" value={props.state.firstName} onChange={props.handleChange} /></label>
                <label>Last Name
                    <input name="lastName" value={props.state.lastName} onChange={props.handleChange} /></label>
                <label>Label for email
                    <input name="email_label" value={props.state.email_label} onChange={props.handleChange} /></label>
                <label>email
                    <input name="email" value={props.state.email} onChange={props.handleChange} /></label>
                <label >Label for second email
                    <input name="email_2_label" value={props.state.email_2_label} onChange={props.handleChange} /></label>
                <label>Second email
                    <input name="email_2" value={props.state.email_2} onChange={props.handleChange} /></label>
                <label >Label for phone
                    <input name="phone_label" value={props.state.phone_label} onChange={props.handleChange} /></label>
                <label >phone
                    <input name="phone" value={props.state.phone} onChange={props.handleChange} /></label>
                <label>Label for second phone
                    <input name="phone_2_label" value={props.state.phone_2_label} onChange={props.handleChange} /></label>
                <label >Second Phone
                    <input name="phone_2" value={props.state.phone_2} onChange={props.handleChange} /></label>
                <label>Address
                    <input name="address" value={props.state.address} onChange={props.handleChange} /></label>
                <label>Notes:
                    <textarea name="other" value={props.state.other} onChange={props.handleChange} /></label>
                <Button type="submit" label="EDIT CONTACT" />
            </form>
        </div>
    )

}

export default SmallEditContactForm