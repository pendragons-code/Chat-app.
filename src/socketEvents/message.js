const { db } = require("../loaders/database.js")
module.exports = {
	name: "message",
	async execute(message, socket, io) {
		db.push("messages", message.trim())
		io.emit("message", message.trim())
	}
}
