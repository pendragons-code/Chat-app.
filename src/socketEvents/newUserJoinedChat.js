const { db } = require("../loaders/database.js")
module.exports = {
	name: "newUserJoinedChat",
	async execute(input, socket, io) {
		db.push("messages", "A new user joined!")
		io.emit("message", "A new user joined!")
	}
}
