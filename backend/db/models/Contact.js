let mongoose = '../../../server/node_modules/mongoose'
mongoose = require(mongoose)

const ContactSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email_label: {
        type: String
    },
    email: {
        type: String
    },
    email_2_label: {
        type: String
    },
    email_2: {
        type: String
    },
    phone_label: {
        type: String
    },
    phone: {
        type: Number
    },
    phone_2_label: {
        type: String
    },
    phone_2: {
        type: Number
    },
    address: {
        type: String
    },
    other: {
        type: String
    }
})

module.exports = mongoose.model("Contact", ContactSchema)