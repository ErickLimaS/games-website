const mongoose = require('mongoose')

const GamesBookmarkedSchema = new mongoose.Schema({

    _id: { type: mongoose.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
    name: { type: String, required: true },
    slug: { type: String, required: true },
    releaseDate: { type: String, required: true },
    rating: { type: Number, required: true },
    dateAdded: { type: Date, required: true, default: () => Date.now() }

})

const GamesBookmarked = mongoose.model('GamesBookmarked', GamesBookmarkedSchema)

module.exports = GamesBookmarked;