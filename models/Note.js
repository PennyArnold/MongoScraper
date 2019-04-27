//requrire mongoose
var mongoose = require("mongoose");
///mongoose schema
var Schema = mongoose.Schema

var noteSchema = new Schema({
    headlineId: {
        type: Schema.Types.ObjectId,
        ref: "Headline"
    },
    /*  summary: {
         type: String,
         required: true
     }, */
    date: String,
    noteText: String
});

var Note = mongoose.model("Note", noteSchema);

module.exports = Note;