const mongoose = require("mongoose");

var todoSchema = new mongoose.Schema({
	title: String,
	done: {type: Date, default: null}
});

module.exports = mongoose.model("Todo",todoSchema);

