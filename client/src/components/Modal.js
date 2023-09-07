import Button from './Button'
import { connect } from 'react-redux'

const Modal = (props) => {
  return (
    <div className="modal-wrapper">
      <Button type="button" handleClick={props.handleClick} label="X" />
      {
        props.type !== 'double' ? props.element : props.authState.toggleForm ? props.element : !props.authState.toggleForm ? props.element2 : null
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    authState: state.auth
  }
}


export default connect(mapStateToProps, null)(Modal)