const bcrypt = require("../../server/node_modules/bcryptjs")
const User = require("../db/models/User")
const passport = require("../../server/node_modules/passport")
const utils = require("./utils")

module.exports = {
  registerAUser: function (req, res) {
    let { firstName, lastName, email, password1, password2, securityQuestion1, securityQuestion2, securityQuestion3, securityAnswer1, securityAnswer2, securityAnswer3 } = req.body
    if (password1 !== password2) {
      return res.json({ message: "The passwords do not match" })
    } else {
      User.findOne({ email }, (err, data) => {
        if (err) {
          console.log(err)
        } else if (!data) {
          let salt = bcrypt.genSaltSync(10)
          let hashed = bcrypt.hashSync(password1, salt)
          let password = hashed
          let loginToken = utils.createTwoFactor(10)
          let newUser = new User({ firstName, lastName, email, password, loginToken, securityQuestion1, securityQuestion2, securityQuestion3, securityAnswer1, securityAnswer2, securityAnswer3 })
          newUser.save((err, data) => {
            if (err) {
              console.log(err)
            } else {
              let { firstName, lastName, email, contacts, _id, loginToken } = data
              res.json({ firstName, lastName, email, contacts, _id, loginToken })
            }
          })
        } else {
          res.json({ message: `${email} is already registered in our database.` })
        }
      })
    }
  },
  loginAUser: function (req, res, next) {
    passport.authenticate("local", (error, user, info) => {
      if (error) {
        info = { message: "Failed Login" }
        res.json(info);
      }
      if (user === false) {
        info = { message: "Password or email do not match database" }
        res.json(info);
      } else {
        User.findById({ _id: user._id }, async (err, data) => {
          let { loginToken } = req.body
          let fromClient = { loginToken }
          if (err) {
            console.log(err)
          }
          if (loginToken !== '') {
            fromClient.loginToken = loginToken
          } else {
            fromClient.loginToken = ''
          }
          if (fromClient.loginToken !== data.loginToken) {
            info = { message: "DB login token does not match database, contact admin for help." }
            res.json(info);
          } else if (fromClient.loginToken === data.loginToken) {
            let newToken = utils.createTwoFactor(10)
            if (newToken !== '') {
              data.loginToken = newToken
            } else {
              data.loginToken = ''
            }
            let { firstName, lastName, email, password, contacts, _id, loginToken } = data
            User.findByIdAndUpdate({ _id: data._id }, { firstName, lastName, email, password, contacts, _id, loginToken }, { new: true }).populate({ path: 'contacts', options: { sort: { 'lastName': 1 } } }).exec((err, data) => {
              if (err) {
                console.log(err)
              } else {
                let { firstName, lastName, email, _id, contacts, loginToken } = data
                info = { message: "DB login token matches database." }
                res.json({ firstName, lastName, email, _id, contacts, loginToken, info });
              }
            })
          }
        })
      }
    })(req, res, next);
  },
  requestQuestions: function (req, res, next) {
    passport.authenticate("local", (error, user, info) => {
      if (error) {
        info = { message: "Failed Login" }
        res.json(info);
      }
      if (user === false) {
        info = { message: "Password or email do not match database" }
        res.json(info);
      } else {
        User.findById({ _id: user._id }, async (err, data) => {
          if (err) {
            console.log(err)
          }
          let { securityQuestion1, securityQuestion2, securityQuestion3 } = data
          info = { message: "Answer all questions to receive the new login token." }
          res.json({ securityQuestion1, securityQuestion2, securityQuestion3, info })
        })
      }
    })(req, res, next);
  },
  requestAToken: function (req, res) {
    let { email, loginToken, securityAnswer1,
      securityAnswer2, securityAnswer3 } = req.body
    let emailFromFront = email
    let fromClient = {}
    User.findOne({ email: emailFromFront }, (err, data) => {
      if (err) {
        console.log(err)
      }
      if (loginToken !== '') {
        fromClient.loginToken = loginToken
      } else {
        fromClient.loginToken = ''
      }
      if (securityAnswer1 !== '') {
        fromClient.securityAnswer1 = securityAnswer1
      }
      if (securityAnswer2 !== '') {
        fromClient.securityAnswer2 = securityAnswer2
      }
      if (securityAnswer3 !== '') {
        fromClient.securityAnswer3 = securityAnswer3
      }
      if (fromClient.securityAnswer1 === data.securityAnswer1 && fromClient.securityAnswer2 === data.securityAnswer2 && fromClient.securityAnswer3 === data.securityAnswer3 && fromClient.loginToken === "newToken") {
        let newToken = utils.createTwoFactor(10)
        if (newToken !== '') {
          data.loginToken = newToken
          let { loginToken } = data
          User.findByIdAndUpdate({ _id: data._id }, { loginToken }, { new: true }).exec((err, data) => {
            if (err) {
              console.log(err)
            } else {
              let { firstName, lastName, email, _id, contacts, loginToken } = data
              info = { message: "DB login token matches database." }
              res.json({ firstName, lastName, email, _id, contacts, loginToken, info });
            }
          })
        } else {
          info = { message: "Token creation failed." }
          res.json(info);
        }
      }
    })
  },
  updateAUser: function (req, res) {
    let { firstName, lastName, email, password1, password2, _id, securityQuestion1, securityQuestion2, securityQuestion3, securityAnswer1, securityAnswer2, securityAnswer3 } = req.body
    let fromFront = { firstName, lastName, email, _id, securityQuestion1, securityQuestion2, securityQuestion3, securityAnswer1, securityAnswer2, securityAnswer3 }
    if (password1 !== password2) {
      return res.json({ message: "The passwords do not match" })
    }
    if (password1 !== '') {
      fromFront.password = password1
    } else {
      fromFront.password = ''
    }
    User.findById({ _id: fromFront._id }, async (err, data) => {
      if (err) {
        console.log(err)
      } else {
        let changedUser = {}
        changedUser._id = data._id
        changedUser.contacts = data.contacts
        if (fromFront.firstName !== data.firstName && fromFront.firstName !== '') {
          changedUser.firstName = fromFront.firstName
        } else {
          changedUser.firstName = data.firstName
        }
        if (fromFront.lastName !== data.lastName && fromFront.lastName !== '') {
          changedUser.lastName = fromFront.lastName
        } else {
          changedUser.lastName = data.lastName
        }

        if (fromFront.securityQuestion1 !== data.securityQuestion1 && fromFront.securityQuestion1 !== '') {
          changedUser.securityQuestion1 = fromFront.securityQuestion1
        } else {
          changedUser.securityQuestion1 = data.securityQuestion1
        }
        if (fromFront.securityQuestion2 !== data.securityQuestion2 && fromFront.securityQuestion2 !== '') {
          changedUser.securityQuestion2 = fromFront.securityQuestion2
        } else {
          changedUser.securityQuestion2 = data.securityQuestion2
        }
        if (fromFront.securityQuestion3 !== data.securityQuestion3 && fromFront.securityQuestion3 !== '') {
          changedUser.securityQuestion3 = fromFront.securityQuestion3
        } else {
          changedUser.securityQuestion3 = data.securityQuestion3
        }

        if (fromFront.securityAnswer1 !== data.securityAnswer1 && fromFront.securityAnswer1 !== '') {
          changedUser.securityAnswer1 = fromFront.securityAnswer1
        } else {
          changedUser.securityAnswer1 = data.securityAnswer1
        }
        if (fromFront.securityAnswer2 !== data.securityAnswer2 && fromFront.securityAnswer2 !== '') {
          changedUser.securityAnswer2 = fromFront.securityAnswer2
        } else {
          changedUser.securityAnswer2 = data.securityAnswer2
        }
        if (fromFront.securityAnswer3 !== data.securityAnswer3 && fromFront.securityAnswer3 !== '') {
          changedUser.securityAnswer3 = fromFront.securityAnswer3
        } else {
          changedUser.securityAnswer3 = data.securityAnswer3
        }

        if (fromFront.password === '') {
          changedUser.password = data.password
        } else {
          let salt = bcrypt.genSaltSync(10)
          let hashed = bcrypt.hashSync(fromFront.password, salt)
          changedUser.password = hashed
        }
        if (fromFront.email === data.email) {
          changedUser.email = data.email
        } else {
          let foundUser = await User.findOne({ email: fromFront.email })
          if (!foundUser) {
            changedUser.email = fromFront.email
          } else {
            return res.json({ message: `${fromFront.email} is already in use` })
          }
        }
        let { firstName, lastName, email, password, contacts, _id, securityQuestion1, securityQuestion2, securityQuestion3, securityAnswer1, securityAnswer2, securityAnswer3 } = changedUser
        User.findByIdAndUpdate({ _id: data._id }, { firstName, lastName, email, password, contacts, _id, securityQuestion1, securityQuestion2, securityQuestion3, securityAnswer1, securityAnswer2, securityAnswer3 }, { new: true }).populate({ path: 'contacts', options: { sort: { 'lastName': 1 } } }).exec((err, data) => {
          if (err) {
            console.log(err)
          } else {
            let { firstName, lastName, email, _id, contacts, loginToken } = data
            res.json({ firstName, lastName, email, _id, contacts, loginToken })
          }
        })
      }
    })
  },
  logOutAUser: function (req, res) {
    req.logout(() => console.log("You are logged out! Whee!"))
    res.json({ message: "You are logged out" })
  },

}
