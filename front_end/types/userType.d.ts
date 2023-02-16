interface SignUp {

    user: {
        name: {
            first: String,
            last: String
        },
        email: String,
        password: String,
        birthDate: {
            date: Number,
            month: Number,
            year: Number
        }
    }
}

interface LogIn {

    email: String,
    password: String

}