const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new mongoose.Schema({

    name: {
        first: { type: String, required: true },
        last: { type: String, required: true }
    },
    email: { type: String, required: true },
    password: { type: String, required: true },
    birthDate: {
        date: { type: Number, required: true, min: 01, max: 31 },
        month: { type: Number, required: true, min: 0, max: 11 },
        year: { type: Number, required: true, min: 1900, max: 2023 }
    },
    bookmarks: [
        // { type: Schema.Types.ObjectId, ref: 'GamesBookmarked' },
        {
            name: { type: String, required: true },
            cover: {
                image_id: { type: String || undefined, required: true },
            },
            slug: { type: String, required: true },
            releaseDate: { type: String, required: true },
            rating: { type: Number, required: true },
            dateAdded: { type: String, required: true, default: () => Math.floor(Date.now() / 1000) }
        }
    ],
    createdAt: { type: Date, default: () => Date.now(), immutable: true }

})

const User = mongoose.model('User', userSchema)

module.exports = User;