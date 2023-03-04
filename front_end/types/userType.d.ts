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

    name: string,
    slug: string,
    cover: {
        image_id: string,
    },
    releaseDate: date,
    rating: number,
    dateAdded: date

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