# Multi-site Pug/React Build 
## Admin Notes

### Mongo Tips
***Use PowerShell Not GetBash***

***Useful MONGO Commands***

> show dbs

> use `database_name`

> db.dropDatabase() 
`After *use* to access database`

> show collections

> db.`collection_name`.find()

> db.`collection_name`.find().pretty()


> db.`collection_name`.drop()


### Description
This is a two-factor authentication built on top of a previous **Contacts** application.

This version(two-factor_B) is also refactored into three directories: backend, client, and server. There are also revisions on the login.js component. Also of note the non-node package size grew from 1.9Mb in A to 11.9 in B.

Contacts is an address book application. 

The user registers for the application and is presented a **login token** that is **required** the next time the user logs in. 

The user must maintain the last token used for the log in process. If a hacker obtains and uses the password, they have no access to the login token the user maintains separately from the login process.

This eliminates the need for the user to maintain a separate security device to generate the one-time-use token.

If the user **looses the token** or tries to long in from a device that the user did not store the last login token, a new token may be issued by answering three user defined questions that are created in the registration process to minimize administrative support requirements.

User defined **security questions** and **answers** may be redefined by updating the user profile.

Once the user logs in it is presented with a view of buttons with the names of his/her contacts. If the user clicks on one of the contacts a modal opens and the contact's information is displayed. The user can add a contact, update or edit a contact's information or delete a contact. Additionally the user can update his/her own information or even delete him/her self from the database.

Here are two views of the application once open, one on a desktop size screen and another at 200pxs. (The App is responsive)

This shot is the desktop view:
![authorized-user-wide](/screenshots/wide.png)

This shot is a view in the browser of the app at 200pxs wide (the inspector is open to reduce the screen to 200px):
![authorized-user-200px](/screenshots/small.png)

### Technologies used

#### Front End:
The Contacts app's UI was made using a create-react-app. React-Router-Dom, Redux, React-Redux, Redux-Thunk and Axios were added as dependencies. Local session storage is also used to persist data.
***React-Router-Dom***  was used for front-end pagination and to create public and private routes. The public route will only allow a user access to the application if he/she is logged in while the private routes will not allow the user to access the public route unless he/she is logged out. If the user is not authorized, he or she is unable to access a protected route by entering the URL path in the browser. The following is a snippet of the code which contolles pagination and user access:

```javascript

    <React.Fragment>
            <Navbar />
            <Routes>
                <Route element={<PublicRoute />}>
                    <Route path="/" element={<InitialLanding />} />
                </Route>
                <Route element={<PrivateRoute />}>
                    <Route path="/landing" element={<Landing />} />
                </Route>
            </Routes>
    </React.Fragment>

```
***Axios*** Was used to send/receive information from the database. A base url was saved in the create-react-app .env and then that base url was brought into a file and used to make API calls with Axios. This was done to illustrate how one can make an API call while protecting information that the developer might not want exposed in the front-end (such as API keys, etc.). Here is an example of that code: 

```javascript

    import axios from 'axios'
    const BASE_URL = process.env.REACT_APP_BASE_URL
    import store from "../redux/store"
    import { logout, getUser, sendMessage } from "../redux/actions/authActions"
    import { getContacts } from "../redux/actions/appActions"

    const API = {
        login: (user)=>{
            axios.post(BASE_URL + "/auth/login", user).then(res=>{
                res.data.message ?
                store.dispatch(sendMessage(res.data.message)) :
                store.dispatch(getUser(res.data))
            })
        }, 
        ...
    }

    export default API

```

***Redux*** is used as the main state manager for the Contacts app, there are two reducers, an auth reducer and an app reducer which are combined to make a root reducer. The redux store is passed into the ***React-Redux*** Provider component which wraps around the App components in the src/index.js file of the create-react-app. Additionally the redux store subcribes to ***local session storage*** in order for the user and user authorization to persist when the page is refreshed. ***Redux-Thunk*** was added as middleware to the redux store so that the async nature of API calls will not cause unexpected results. The following code block is the redux store: 

```javascript
    const store = createStore(rootReducer, applyMiddleware(thunk))

    store.subscribe(()=>{
        sessionStorage.setItem('state', JSON.stringify(store.getState()))
    })

```

#### Back End:

The back end of Contacts uses an OMV architecture and was built in Node.js using an Express server, and local Mongodb database. The server uses helmet.js for an added layer of security, passport.js for authentication and mongoose to interact with the database.

The server was kept intentionally clean, the database, routes and express-session/passport were built out in separate modules and brought into the server. Express-session takes in app as a dependency. Cors is also used to handle communication with the front-end. Here is the server:

```javascript

    const express = require("express")
    const app = express()
    const cors = require("cors")
    const helmet = require("helmet")
    const session = require("./auth/connectSession")
    const routes = require("./routes")
    const PORT = process.env.PORT || 8080

    app.use(express.json())
    app.use(express.urlencoded({extended:false}))
    app.use(cors())
    app.use(helmet())

    session(app)
    app.use(routes)
    require("./db/dbConnect")

    app.listen(PORT, ()=>console.log("Tiny ears listen...."))

    module.exports = app;

``` 
***Mongoose*** connects the server with the database in its own module. Here is a copy of that module:

```javascript

    if(process.env.NODE_ENV !== "production"){
    require("dotenv").config()
    }
    const mongoose = require("mongoose")
    const MONGO_URI = process.env.MONGO_URI

    mongoose.connect(MONGO_URI, console.log("The mongoose is on the loose!"))

```

Similarly, ***Express-session*** is set to its own module which also sets the ***Passport*** middleware to the server. The ***passport-local*** strategy is brought into the express-session module as a dependency that takes in Passport. The code fpr local strategy comes from the passport documentation.

From connectSession.js

```javascript

    module.exports = function (app) {
        app.use(
            session({
                secret: process.env.SESSION_SECRET,
                resave: true,
                saveUninitialized: true,
                cookie: { secure: false },
                key: 'express.sid',
            })
        );
        app.use(passport.initialize());
        app.use(passport.session());
        require("./connectPassport")(passport)
    }

```

And from connectPassport.js: 

```javascript

    module.exports = function(passport){
    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
    
      passport.deserializeUser((id, done) => {
        User.findById(id, (err, doc) => {
          done(null, doc);
        });
      });
    
      passport.use(
        new LocalStrategy({ usernameField : 'email'},function (email, password, done) {
          User.findOne({ email }, function (err, user) {
            if (err) {
              return done(err);
            }
            if (!user) {
              return done(null, false);
            }
            if (!bcrypt.compareSync(password, user.password)) {
              return done(null, false);
            }
            return done(null, user);
          });
        })
      ); 
    }

```

The routes are routed as methods that take in controller functions. This serves to keep the database and the routes and any helper functions separate. Here is an example of the app routes:

```javascript

    const router = require("express").Router()
    const controller = require("../controllers")

    router.route("/").post(controller.getContacts)
    router.route("/add").post(controller.addContact)
    router.route("/delete").post(controller.deleteContact)
    router.route("/update").post(controller.updateContact)
    router.route("/deleteuser").post(controller.deleteUser)


    module.exports = router

```

and following is an excerpt from the app controllers:

```javascript

    module.exports = {

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
    }

```

### Testing

Testing was done using ***Mocha chai*** assertion testing (tdd) with ***chai-http***. The testing script was changed in the package.json to run tests with Mocha chai assertions, e.g.,

```json
    "scripts": {
    "test": "mocha --timeout 10000 --u tdd",
    }

```
Testing was done using suites and assertions. Here is the suite to test the login function: 

```javascript
    suite("login a user", ()=>{
            let loginUser = {
                email: "test1E@mail.com",
                password: "password",
            }
            let wrongPass = {
                email: "test1E@mail.com",
                password: "catsstink",
            }
            let wrongEmail = {
                email: "testY@mail.com",
                password: "password",
            }
        test("should be able to log in a user", (done)=>{
            chai.request(server)
            .post("/auth/login")
            .send(loginUser)
            .end((err, res)=>{
                assert.equal(res.status, 200)
                assert.isNotEmpty(res.body.firstName)
                assert.isNotEmpty(res.body.lastName)
                assert.isNotEmpty(res.body.email)
                assert.isNotEmpty(res.body._id)
                assert.isArray(res.body.contacts)
                done()
            })
        })
        test("should get an error - wrong password", (done)=>{
            chai.request(server)
            .post("/auth/login")
            .send(wrongPass)
            .end((err, res)=>{
                assert.equal(res.status, 200)
                assert.equal(res.body.message, "password or email do not match database")
                done()
            })
        })
        test("should get an error - wrong email", (done)=>{
            chai.request(server)
            .post("/auth/login")
            .send(wrongEmail)
            .end((err, res)=>{
                assert.equal(res.status, 200)
                assert.equal(res.body.message, "password or email do not match database")
                done()
            })
        })
    })

``` 

#### Start scripts etc.

To start the back-end and the front-end at the same time, the dev dependency, concurrently was used. ***Concurrently*** starts two scripts at the same time - in this case starting the server with ***nodemon*** and the creat-react-app:

```json

    "scripts": {
        "test": "mocha --timeout 10000 --u tdd",
        "server": "nodemon server.js",
        "start": "node server.js",
        "client": "npm start --prefix client",
        "dev": "concurrently \"npm  run server\" \"npm run client\" "
    }

```

***Nodemon*** was used to start the development server so that it restarts its self when a change is made. ***Dotenv*** is an additional dev dependency that makes the process.env object available to hide variables on the front end.

### WHAT I HAVE LEARNED WITH THIS PROJECT

incomplete