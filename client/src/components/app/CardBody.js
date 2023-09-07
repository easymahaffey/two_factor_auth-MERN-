import { formatPhoneNumber } from "../../utils/formatPhoneNumber"

const CardBody = (props) => {
    return (
        <div className="card-body">
            {props.contact.email_label && props.contact.email ?<p className="card-label">{props.contact.email_label}</p> : null}
            { props.contact.email ? <p className="card-value">{props.contact.email}</p> : null }
            {props.contact.email_2_label && props.contact.email_2 ? <p className="card-label">{props.contact.email_2_label}</p> : null}
            {props.contact.email_2 ? <p className="card-value">{props.contact.email_2}</p> : null}
            {props.contact.phone_label && props.contact.phone ? <p className="card-label">{props.contact.phone_label}</p> : null}
            {props.contact.phone ? <p className="card-value">{formatPhoneNumber(props.contact.phone)}</p> : null}
            {props.contact.phone_2_label && props.contact.phone_2 ? <p className="card-label">{props.contact.phone_2_label}</p> : null}
            {props.contact.phone_2 ? <p className="card-value">{formatPhoneNumber(props.contact.phone_2)}</p> : null}
            {props.contact.address ? <p className="card-label">Address</p> : null }
            { props.contact.address ? <p className="card-value">{props.contact.address}</p> : null}
            {props.contact.other ? <p className="card-label">Notes:</p> : null}
            {props.contact.other ? <p className="card-other">{props.contact.other}</p> : null}
        </div>
    )
}

export default CardBody