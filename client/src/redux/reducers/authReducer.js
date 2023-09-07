import { OPEN_MODAL, CLOSE_MODAL, TOGGLE_FORM, LOGOUT, WINDOW_RESIZE, SEND_MESSAGE, GET_USER, CHECK_TOKEN, TOGGLE_TOKEN, TOGGLE_QUESTION, CHECK_QUESTION } from '../types'
import { auth2Token } from '../../utils/auth2Token'

if (!JSON.parse(window.sessionStorage.getItem('state'))) {
  window.sessionStorage.setItem('state', JSON.stringify({ auth: { isAuth: false, test: false, user: {} } }))
}
const isAuth = JSON.parse(window.sessionStorage.getItem("state")).auth.isAuth
const user = JSON.parse(window.sessionStorage.getItem("state")).auth.user
const test = JSON.parse(window.sessionStorage.getItem("state")).auth.test


const initialState = {
  isAuth,
  user,
  test,
  modalOpen: false,
  toggleForm: true,
  toggleToken: false,
  toggleQuestion: false,
  window: window.innerWidth,
  isHeader: true,
  message: '',
  securityQuestion1: '',
  securityQuestion2: '',
  securityQuestion3: '',
  securityAnswer1: "",
  securityAnswer2: "",
  securityAnswer3: "",
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        modalOpen: true
      }
    case CLOSE_MODAL:
      return {
        ...state,
        modalOpen: false,
        toggleForm: true
      }
    case TOGGLE_FORM:
      return {
        ...state,
        toggleForm: !state.toggleForm
      }
    case TOGGLE_TOKEN:
      return {
        ...state,
        toggleToken: !state.toggleToken
      }
    case TOGGLE_QUESTION:
      return {
        ...state,
        toggleQuestion: !state.toggleQuestion,
      }
    case LOGOUT:
      return {
        ...state,
        isAuth: false,
        modalOpen: false,
        toggleForm: true,
        isHeader: true,
        message: '',
        test: false,
        toggleToken: false,
        toggleQuestion: false,
        window: window.innerWidth,
        isHeader: true,
        message: '',
        securityQuestion1: '',
        securityQuestion2: '',
        securityQuestion3: '',
        securityAnswer1: "",
        securityAnswer2: "",
        securityAnswer3: "",
      }
    case WINDOW_RESIZE:
      return {
        ...state,
        window: window.innerWidth
      }
    case SEND_MESSAGE:
      return {
        ...state,
        message: action.payload
      }
    case CHECK_TOKEN:
      let localLoginToken = action.payload.info
      let tokenTest = auth2Token(localLoginToken).test
      let testMessage = auth2Token(localLoginToken).message
      return {
        ...state,
        test: tokenTest,
        message: testMessage
      }
    case CHECK_QUESTION:
      let questionMessage = action.payload.info.message
      return {
        ...state,
        toggleToken: !state.toggleToken,
        toggleQuestion: !state.toggleQuestion,
        securityQuestion1: action.payload.securityQuestion1,
        securityQuestion2: action.payload.securityQuestion2,
        securityQuestion3: action.payload.securityQuestion3,
        message: questionMessage
      }
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        isAuth: true,
        modalOpen: false,
        toggleForm: true,
        isHeader: true,
        message: '',
      }
    default:
      return state;
  }
}

export default authReducer