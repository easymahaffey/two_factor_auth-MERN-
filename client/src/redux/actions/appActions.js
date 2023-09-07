import { OPEN_CONTACT_MODAL, CLOSE_CONTACT_MODAL, NO_HAMBURGER, GET_HAMBURGER, CLOSE_MENU, OPEN_MENU, GET_CONTACTS } from '../types'

export const openContactModal = () =>{
    return {
        type: OPEN_CONTACT_MODAL
    }
}

export const closeContactModal = () =>{
    return {
        type: CLOSE_CONTACT_MODAL
    }
}

export const noHamburger = () =>{
    return {
        type: NO_HAMBURGER
    }
}

export const getHamburger = () => {
    return {
        type: GET_HAMBURGER
    }
}

export const closeMenu = () => {
    return {
        type: CLOSE_MENU
    }
}

export const openMenu = () => {
    return {
        type: OPEN_MENU
    }
}

export const getContacts = (contacts) =>{
    return {
        type: GET_CONTACTS,
        payload: contacts
    }
}


