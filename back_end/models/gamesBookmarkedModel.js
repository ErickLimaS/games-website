const mongoose = require('mongoose')

const GamesBookmarkedSchema = new mongoose.Schema({

    // _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
    name: { type: String, required: true },
    cover: {
        image_id: { type: String || undefined, required: true },
    },
    slug: { type: String, required: true },
    releaseDate: { type: String, required: true },
    rating: { type: Number, required: true },
    dateAdded: { type: String, required: true, default: () => Math.floor(Date.now() / 1000) }

})

const GamesBookmarked = mongoose.model('GamesBookmarked', GamesBookmarkedSchema)

module.exports = GamesBookmarked;