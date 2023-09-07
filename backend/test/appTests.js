// const chai = require('chai')
// const assert = chai.assert
// const server = require("../server")
// const chaiHttp = require('chai-http')
// chai.use(chaiHttp)

// suite("Should be able to add a contact", ()=>{
//     let newContact = {
//         userId : "624db567ad0a2ec5bb62000e", firstName: "Tester", lastName: "Contact", email_label: "personal", email: "testercontact@mail.com", email_2_label: "work", email_2: "tcontact@mail.com", phone_label: "home", phone: "(444)123-4567", phone_2_label: "work", phone_2: "(444)987-1234", address: "123 Wild Blue Yonder ln", other: "Never make direct eye-contact!"
//     }
//     let emptyFields = {
//         userId : "624db567ad0a2ec5bb62000e", firstName: "Tester", lastName: "Contact", email_label: "personal", email: "testercontact@mail.com", email_2_label: "", email_2: "", phone_label: "home", phone: "(444)123-4567", phone_2_label: "", phone_2: "", address: "", other: "Some fields are left empty"
//     }
//     test("can add a contact", (done)=>{
//         chai.request(server)
//         .post("/contacts/add")
//         .send(newContact)
//         .end((err, res)=>{
//             console.log(res.body)
//             assert.equal(res.status, 200)
//             done()
//         })
//     })
//     test("can add a contact", (done)=>{
//         chai.request(server)
//         .post("/contacts/add")
//         .send(emptyFields)
//         .end((err, res)=>{
//             console.log(res.body)
//             assert.equal(res.status, 200)
//             done()
//         })
//     })
// })

// suite("should be able to delete a contact", ()=>{
//     test("should delete a contact", (done)=>{
//         chai.request(server)
//         .post("/contacts/delete")
//         .send({_id: "624ef74a4ac805e7dd027ecc"})
//         .end((err, res)=>{
//             console.log(res.body)
//             assert.equal(res.status, 200)
//             done()
//         })
//     })
// })

// suite("Should be able to edit a contact", ()=>{
//         let updatedOne = { _id: '624f0cf8be505fc14c661a1f',userId : "624db567ad0a2ec5bb62000e", firstName: "Updated", lastName: "Contact", email_label: "personal", email: "updatedcontact@mail.com", email_2_label: "", email_2: "", phone_label: "home", phone: "(444)123-4567", phone_2_label: "", phone_2: "", address: "somewhere over the rainbow", other: "Some fields now updated"}
//     test("should be able to update this contact", (done)=>{
//         chai.request(server)
//         .post("/contacts/update")
//         .send(updatedOne)
//         .end((err, res)=>{
//             console.log(res.body)
//             assert.equal(res.status, 200)
//             done()
//         })
//     })
// })