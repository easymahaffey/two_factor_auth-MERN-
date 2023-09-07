const appFunctions = require("./appFunctions")
const authFunctions = require("./authFunctions")

module.exports = {
    register: authFunctions.registerAUser,
    login: authFunctions.loginAUser,
    requestQuestion: authFunctions.requestQuestions,
    requestToken: authFunctions.requestAToken,
    updateUser: authFunctions.updateAUser,
    logout: authFunctions.logOutAUser,
    addContact: appFunctions.addContact,
    deleteContact: appFunctions.deleteContact,
    updateContact: appFunctions.editContact,
    getContacts: appFunctions.getContacts,
    deleteUser: appFunctions.deleteUser
}