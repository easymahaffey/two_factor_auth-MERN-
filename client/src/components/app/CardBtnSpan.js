import Button from "../Button"

const CardBtnSpan = (props) =>{
    return(
        <span className="card-btn-span">
            { props.buttons.map(button=><Button type="button" handleClick={button.handleClick} label={button.label} key={button.label}/>)}
        </span>
    )
}

export default CardBtnSpan