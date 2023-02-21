interface User {

    loading?: boolean,
    error?: object,
    success?: boolean,
    name: {
        first: String,
        last: String
    },
    email: String,
    bookmarks: [BookmarkedGame]

}

interface BookmarkedGame {

    name: String,
    slug: String,
    releaseDate: String,
    rating: Number,
    dateAdded: Date

}

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