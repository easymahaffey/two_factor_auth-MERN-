import AddContactModal from '../app/AddContactModal'
import UpdateUserModal from '../app/UpdateUserModal'
import UserSpan from './UserSpan'
import Button from "../Button"
import API from "../../utils/API"

const LargeAuthNav = (props) =>{
    return(
        <nav>
            <UserSpan />
            <AddContactModal />
            <UpdateUserModal />
            <Button type="button" label="LOGOUT" handleClick={API.logout}/>
        </nav>
    )
}


export default LargeAuthNav