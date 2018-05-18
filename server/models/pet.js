const mongoose = require('mongoose')

var PetSchema = new mongoose.Schema({
    name: { type: String, default: "", minlength: [3, 'name must be at least 3 characters'], required: [true, 'name field required!'], unique: true },
    type: { type: String, default: "", minlength: [3, 'type must be at least 3 characters'], required: [true, 'type field required!']},
    description: { type: String, default: "", minlength: [3, 'description must be at least 3 characters'], required: [true, 'description field required!']},
    skills: { type: Array, default: [] },
    likes: {type: Number, default: 0},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
})
mongoose.model('Pet', PetSchema); // We are setting this Schema in our Models as 'User'

