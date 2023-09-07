import axios from 'axios'
const BASE_URL = process.env.REACT_APP_BASE_URL
import store from "../redux/store"
import { logout, getUser, sendMessage, checkToken, checkQuestion } from "../redux/actions/authActions"
import { getContacts } from "../redux/actions/appActions"

const API = {
  securityQuestion: (user) => {
    axios.post(BASE_URL + "/auth/requestQuestion", user)
      .then(res => {
        res.data.message ?
          store.dispatch(sendMessage(res.data.message)) :
          store.dispatch(checkQuestion(res.data))
      })
  },
  requestToken: (user) => {
    axios.post(BASE_URL + "/auth/requestToken", user)
      .then(res => {
        res.data.message ?
          store.dispatch(sendMessage(res.data.message)) :
          store.dispatch(getUser(res.data))
      })
  },
  loginToken: (token) => {
    axios.post(BASE_URL + "/auth/login", token).then(
      store.dispatch(checkToken(token))
    )
  },
  login: (user) => {
    axios.post(BASE_URL + "/auth/login", user)
      .then(res => {
        res.data.message ?
          store.dispatch(sendMessage(res.data.message)) :
          store.dispatch(getUser(res.data))
      })
  },
  register: (user) => {
    axios.post(BASE_URL + "/auth/register", user)
      .then(res => {
        res.data.message ?
          store.dispatch(sendMessage(res.data.message)) :
          store.dispatch(getUser(res.data))
      })
  },
  update: (updatedUser) => {
    axios.post(BASE_URL + "/auth/update", updatedUser).then(res => store.dispatch(getUser(res.data)))
  },
  logout: () => {
    axios.post(BASE_URL + "/auth/logout").then(res => store.dispatch(logout()))
  },
  addContact: (contact) => {
    axios.post(BASE_URL + "/contacts/add", contact).then(res => store.dispatch(getContacts(res.data)))
  },
  deleteContact: (_id) => {
    axios.post(BASE_URL + "/contacts/delete", { _id }).then(res => store.dispatch(getContacts(res.data)))
  },
  editContact: (updatedContact) => {
    axios.post(BASE_URL + "/contacts/update", updatedContact).then(res => store.dispatch(getContacts(res.data)))
  },
  bringInContacts: (_id) => {
    axios.post(BASE_URL + "/contacts", { _id }).then(res => store.dispatch(getContacts(res.data)))
  },
  deleteUser: (_id) => {
    axios.post(BASE_URL + "/contacts/deleteuser", { _id }).then(res => store.dispatch(logout()))
  }
}

export default API