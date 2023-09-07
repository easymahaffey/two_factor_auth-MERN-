import { OPEN_MODAL, CLOSE_MODAL, TOGGLE_FORM, TOGGLE_TOKEN, LOGOUT, WINDOW_RESIZE, SEND_MESSAGE, GET_USER, CHECK_TOKEN, CHECK_QUESTION, TOGGLE_QUESTION } from '../types'

export const openModal = () =>{
    return {
        type: OPEN_MODAL
    }
}

export const closeModal = () =>{
    return {
        type: CLOSE_MODAL
    }
}

export const toggleForm = () =>{
    return {
        type: TOGGLE_FORM
    }
}

export const toggleToken = () =>{
    return {
        type: TOGGLE_TOKEN
    }
}

export const toggleQuestion = () =>{
    return {
        type: TOGGLE_QUESTION
    }
}

export const logout = () =>{
    return {
        type: LOGOUT
    }
}

export const windowResize = () =>{
    return {
        type: WINDOW_RESIZE
    }
}

export const sendMessage = (message) =>{
    return {
        type: SEND_MESSAGE,
        payload: message
    }
}

export const checkToken = (info) =>{
    return {
        type: CHECK_TOKEN,
        payload: {info}
    }
}

export const checkQuestion = (question) =>{
    return {
        type: CHECK_QUESTION,
        payload: question
    }
}

export const getUser = (user) =>{
    return {
        type: GET_USER,
        payload: user
    }
}


