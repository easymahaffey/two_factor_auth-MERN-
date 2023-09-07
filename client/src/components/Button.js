

const Button = (props) => {
    return (
        <button onClick={props.type === 'button' ? props.handleClick : null } className={`btn ${props.className}`}>{props.label}</button>
    )
}

export default Button