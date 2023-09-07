const Contact = require("../db/models/Contact")
const User = require("../db/models/User")
const utils = require("./utils")

module.exports = {
    addContact: function (req, res) {
        let { userId, firstName, lastName, email_label, email, email_2_label, email_2, phone_label, phone, phone_2_label, phone_2, address, other } = req.body
        let newPhone = utils.getNumber(phone)
        let newPhone_2 = utils.getNumber(phone_2)
        let contact = {}
        contact.userId = userId
        if (firstName !== '') {
            contact.firstName = firstName
        }
        if (lastName !== '') {
            contact.lastName = lastName
        }
        if (email_label !== '') {
            contact.email_label = email_label
        }
        if (email !== '') {
            contact.email = email
        }
        if (email_2_label !== '') {
            contact.email_2_label = email_2_label
        }
        if (email_2 !== '') {
            contact.email_2 = email_2
        }
        if (phone_label !== '') {
            contact.phone_label = phone_label
        }
        if (typeof newPhone === 'number') {
            contact.phone = newPhone
        }
        if (phone_2_label !== '') {
            contact.phone_2_label = phone_2_label
        }
        if (typeof newPhone_2 === 'number') {
            contact.phone_2 = newPhone_2
        }
        if (address !== '') {
            contact.address = address
        }
        if (other !== '') {
            contact.other = other
        }
        let newContact = new Contact(contact)
        newContact.save((err, data) => {
            if (err) {
                console.log(err)
            } else {
                User.findByIdAndUpdate({ _id: data.userId }, { $push: { contacts: data._id } }, { new: true }).populate({path:'contacts', options:{sort:{'lastName':1}}}).exec((err, data) => {
                    if (err) {
                        console.log(err)
                    } else {
                        res.json(data.contacts)
                    }
                })
            }
        })
    },
    deleteContact: function (req, res) {
        let { _id } = req.body
        Contact.findByIdAndDelete({ _id }, (err, data) => {
            if (err) {
                console.log(err)
            } else {
                User.findByIdAndUpdate({ _id: data.userId }, { $pull: { contacts: data._id } }, { new: true }).populate({path:'contacts', options:{sort:{'lastName':1}}}).exec((err, data) => {
                    if (err) {
                        console.log(err)
                    } else {
                        res.json(data.contacts)
                    }
                })
            }
        })
    },
    editContact: async function (req, res) {
        let { _id, userId, firstName, lastName, email_label, email, email_2_label, email_2, phone_label, phone, phone_2_label, phone_2, address, other } = req.body
        const mirror = await Contact.findById({ _id })
        const newPhone = utils.getNumber(phone)
        const newPhone_2 = utils.getNumber(phone_2)
        let updated = {}
        updated._id = _id
        updated.userId = userId
        if (firstName !== mirror.firstName) {
            updated.firstName = firstName
        } else {
            updated.firstName = mirror.firstName
        }
        if (lastName !== mirror.lastName) {
            updated.lastName = lastName
        } else {
            updated.lastName = mirror.lastName
        }
        if (email_label !== mirror.email_label) {
            updated.email_label = email_label
        } else {
            updated.email_label = mirror.email_label
        }
        if (email !== mirror.email) {
            updated.email = email
        } else {
            updated.email = mirror.email
        }
        if (email_2_label !== mirror.email_2_label) {
            updated.email_2_label = email_2_label
        } else {
            updated.email_2_label = mirror.email_2_label
        }
        if (email_2 !== mirror.email_2) {
            updated.email_2 = email_2
        } else {
            updated.email_2 = mirror.email_2
        }
        if (phone_label !== mirror.phone_label) {
            updated.phone_label = phone_label
        } else {
            updated.phone_label = mirror.phone_label
        }
        if (mirror.phone && newPhone !== mirror.phone && typeof newPhone === 'number') {
            updated.phone = newPhone
        } else if (!mirror.phone && typeof newPhone === 'number') {
            updated.phone = newPhone
        } else if (mirror.phone) {
            updated.phone = mirror.phone
        }
        if (phone_2_label !== mirror.phone_2_label) {
            updated.phone_2_label = phone_2_label
        } else {
            updated.phone_2_label = mirror.phone_2_label
        }
        if (mirror.phone_2 && newPhone_2 !== mirror.phone_2 && typeof newPhone_2 === 'number') {
            updated.phone_2 = newPhone_2
        } else if (!mirror.phone_2 && typeof newPhone_2 === 'number') {
            updated.phone_2 = newPhone_2
        } else if (mirror.phone_2) {
            updated.phone_2 = mirror.phone_2
        }
        if (address !== mirror.address) {
            updated.address = address
        } else {
            updated.address = mirror.address
        }
        if (other !== mirror.other) {
            updated.other = other
        } else {
            updated.other = mirror.other
        }
        updated = Object.entries(updated).reduce((a,[key,value]) => (value ? (a[key]=value, a) : a), {})
        Contact.findByIdAndUpdate({ _id }, { $set: updated }, { new: true }, (err, data) => {
            if (err) {
                console.log(err)
            } else {
                User.findById({ _id: data.userId }).populate({path:'contacts', options:{sort:{'lastName':1}}}).exec((err, data) => {
                    if (err) {
                        console.log(err)
                    } else {
                        res.json(data.contacts)
                    }
                })
            }
        })
    },
    getContacts: function(req, res){
        let { _id } = req.body
        User.findById({_id}).populate({path:'contacts', options:{sort:{'lastName':1}}}).exec((err, data)=>{
            if(err){
                console.log(err)
            } else {
                res.json(data.contacts)
            }
        })
    },
    deleteUser: function(req, res){
        let { _id } = req.body
        User.findByIdAndDelete({ _id }, (err, data)=>{
            if(err){
                console.log(err)
            } else {
                Contact.deleteMany({ userId: data._id}, (err, data)=>{
                    if(err){
                        console.log(err)
                    } else {
                        res.json({ message: "User and user contacts deleted"})
                    }
                })
            }
        })
    }
}