const chai = require('chai')
const assert = chai.assert
const server = require("../server")
const chaiHttp = require('chai-http')
chai.use(chaiHttp)


suite("register a User", ()=>{
    let user1 = {
        firstName: "Test",
        lastName: "One",
        email: "test1E@mail.com",
        password1: "password",
        password2: "password"
    }
    let wrongPass = {
        firstName: "Test",
        lastName: "One",
        email: "test1E@mail.com",
        password1: "catsstink",
        password2: "password"
    }

    // test("should be able to register a user", (done)=>{
    //     chai.request(server)
    //     .post("/auth/register")
    //     .send(user1)
    //     .end((err, res)=>{
    //         assert.equal(res.status, 200)
    //         assert.isString(res.body.firstName)
    //         assert.isString(res.body._id)
    //         assert.isArray(res.body.contacts)
    //         done()
    //     })
    // })

    test("Should get a message if the passwords don't match", (done)=>{
        chai.request(server)
        .post("/auth/register")
        .send(wrongPass)
        .end((err, res)=>{
            assert.equal(res.status, 200)
            assert.equal(res.body.message, "The passwords do not match")
            done()
        })
    })

    test("Should get a message if email already in use", (done)=>{
        chai.request(server)
        .post("/auth/register")
        .send(user1)
        .end((err, res)=>{
            assert.equal(res.status, 200)
            assert.equal(res.body.message, "test1E@mail.com is already registered in our database.")
            done()
        })
    })
})

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
suite("Update user", ()=>{
    let updateFirst = {
        _id: "624db567ad0a2ec5bb62000e",
        firstName: "Updatedtest",
        lastName: "",
        email: "",
        password1: "",
        password2: ""
    }
    let updateLast = {
        _id: "624db567ad0a2ec5bb62000e",
        firstName: "",
        lastName: "Juan",
        email: "",
        password1: "",
        password2: ""
    }
    let updateEmailWrong = {
        _id: "624db567ad0a2ec5bb62000e",
        firstName: "",
        lastName: "",
        email: "test1B@mail.com",
        password1: "",
        password2: ""
    }
    let updateEmail = {
        _id: "624db567ad0a2ec5bb62000e",
        firstName: "",
        lastName: "",
        email: "testingupdate@mail.com",
        password1: "",
        password2: ""
    }
    let updatePassWrong = {
        _id: "624db567ad0a2ec5bb62000e",
        firstName: "",
        lastName: "",
        email: "",
        password1: "catsstink",
        password2: ""
    }
    let updatePass = {
        _id: "624db567ad0a2ec5bb62000e",
        firstName: "",
        lastName: "",
        email: "",
        password1: "catsstink",
        password2: "catsstink" 
    }
    let updateAll = {
        _id: "624db567ad0a2ec5bb62000e",
        firstName: "Whoo",
        lastName: "Hoo",
        email: "updateeverything@mail.com",
        password1: "catssmell",
        password2: "catssmell"  
    }
    test("should be able to update a user-firstName", (done)=>{
        chai.request(server)
        .post("/auth/update")
        .send(updateFirst)
        .end((err, res)=>{
            assert.equal(res.status, 200)
            assert.equal(res.body.firstName, "Updatedtest")
            done()
        })
    })
    test("should be able to update a user-lastName", (done)=>{
        chai.request(server)
        .post("/auth/update")
        .send(updateLast)
        .end((err, res)=>{
            assert.equal(res.status, 200)
            assert.equal(res.body.lastName, "Juan")
            done()
        })
    })
    test("should get an error if try and update to already existing email", (done)=>{
        chai.request(server)
        .post("/auth/update")
        .send(updateEmailWrong)
        .end((err, res)=>{
            assert.equal(res.status, 200)
            assert.equal(res.body.message, "test1B@mail.com is already in use")
            done()
        })
    })
    test("should be able to update a user-email", (done)=>{
        chai.request(server)
        .post("/auth/update")
        .send(updateEmail)
        .end((err, res)=>{
            assert.equal(res.status, 200)
            assert.equal(res.body.email, "testingupdate@mail.com")
            done()
        })
    })
    test("should get an error if try and update passwords that don't match", (done)=>{
        chai.request(server)
        .post("/auth/update")
        .send(updatePassWrong)
        .end((err, res)=>{
            assert.equal(res.status, 200)
            assert.equal(res.body.message, "The passwords do not match")
            done()
        })
    })
    test("should be able to update a user-password", (done)=>{
        chai.request(server)
        .post("/auth/update")
        .send(updatePass)
        .end((err, res)=>{
            assert.equal(res.status, 200)
            assert.equal(res.body.email, "")
            done()
        })
    })
    test("should be able to update ALL fields", (done)=>{
        chai.request(server)
        .post("/auth/update")
        .send(updateAll)
        .end((err, res)=>{
            assert.equal(res.status, 200)
            assert.equal(res.body.firstName,"Whoo")
            assert.equal(res.body.lastName, "Hoo")
            assert.equal(res.body.email, "updateeverything@mail.com")
            done()
        })
    })
})
