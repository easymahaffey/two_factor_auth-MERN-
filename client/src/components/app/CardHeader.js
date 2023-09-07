import Button from "../Button"

const CardHeader = (props) => {
    return (
        <div className="card-header">
            <h3>{props.contact.firstName} {props.contact.lastName}</h3>
            {/* <Button type="button" handleClick={props.handleClick} label={props.btnLabel} /> */}
        </div>
    )
}

export default CardHeader