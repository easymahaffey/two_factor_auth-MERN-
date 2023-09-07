import Button from '../Button'
import { connect } from 'react-redux'
import API from "../../utils/API"


const DeleteUserModal = (props) =>{
    return(
        <div className="delete-user-modal-wrapper">
            
            <div className="delete-user-modal-modal">
                <h3>Warning!</h3>
                <p>Deleting user will erase the user and all data associated with that user!</p>
                <Button type="button" className="dub delete-user-btn" handleClick={()=>API.deleteUser(props.authState.user._id)} label="DELETE USER" />
                <Button type="button" className="dub cancel-delete-user-btn" handleClick={props.handleDeleteUser} label="CANCEL" />
            </div>
        </div>
    )
}

const mapStateToProps = (state) =>{
    return {
        authState: state.auth
    }
}

export default connect(mapStateToProps, null)(DeleteUserModal)