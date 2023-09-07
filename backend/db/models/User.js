let  mongoose = '../../../server/node_modules/mongoose'
mongoose = require(mongoose)

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    loginToken: {
        type: String,
        required: true
    },
    securityQuestion1: {
      type: String,
        required: true
    },
    securityQuestion2: {
      type: String,
        required: true
    },
    securityQuestion3: {
      type: String,
        required: true
    },
    securityAnswer1: {
      type: String,
        required: true
    },
    securityAnswer2: {
      type: String,
        required: true
    },
    securityAnswer3: {
      type: String,
        required: true
    },
    contacts: {
        type: [ mongoose.Schema.Types.ObjectId ],
        ref: 'Contact'
    }
})

module.exports = mongoose.model("User", UserSchema)