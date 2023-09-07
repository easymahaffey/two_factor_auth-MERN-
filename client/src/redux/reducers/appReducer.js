import { CLOSE_CONTACT_MODAL, CLOSE_MENU, GET_HAMBURGER, NO_HAMBURGER, OPEN_CONTACT_MODAL, OPEN_MENU, GET_CONTACTS } from '../types'

const initialState = {
    addContactModal: false,
    hamburger: true,
    menu: true,
    contacts: []
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_CONTACT_MODAL:
            return {
                ...state,
                addContactModal: true
            }
        case CLOSE_CONTACT_MODAL:
            return {
                ...state,
                addContactModal: false
            }
        case NO_HAMBURGER:
            return {
                ...state,
                hamburger: false
            }
        case GET_HAMBURGER:
            return {
                ...state,
                hamburger: true
            }
        case OPEN_MENU:
            return {
                ...state,
                menu: true
            }
        case CLOSE_MENU:
            return {
                ...state,
                menu: false
            }
        case GET_CONTACTS:
            return {
                ...state,
                contacts: action.payload,
                addContactModal: false,
                hamburger: true
            }
        default:
            return state;
    }
}

export default appReducer