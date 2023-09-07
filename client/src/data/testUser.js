let userId = 3;

const contact1 = {
    _id: 1,
    userId,
    firstName: "Test",
    lastName: "Contact1",
    email_label: "personal",
    email: "contact1@mail.com",
    email_2_label: "work1",
    email_2: "contact1@work.com",
    phone_label: "cell",
    phone: 1234567890,
    phone_2_label: "work",
    phone_2: 3451236789,
    address: "234 Seaside Ln, Yuma AZ",
    other: "Do not trust around chocolate"
}

const contact2 = {
    _id: 2,
    userId,
    firstName: "Test2",
    lastName: "Contact2",
    email_label: "personal",
    email: "contact2@mail.com",
    email_2_label: "work2",
    email_2: "contact2@work.com",
    phone_label: "cell",
    phone: 1234567890,
    phone_2_label: "work",
    phone_2: 3451236789,
    address: "7910 Seaside Vista, Yuma AZ",
    other: "Does not eat cabbage"
}

export const testUser = {
    _id: userId,
    firstName: "Test",
    lastName: "User",
    email: "test@mail.com",
    contacts: [ contact1, contact2 ]
}