const { db } = require("../../loaders/database.js")
module.exports = {
	name: "/chat",
	async execute(req, res) {
		const previousMessages = await db.get("messages")
		let history = ""
		// will consider layers of caching, so it will only render 10 messages at a time, unless requested to search more.
		if(previousMessages !== null && previousMessages.length > 0) {
			for(message in previousMessages) {
				history += `<li>${previousMessages[message]}</li>`
			}
		}
		return res.render("chatRoom.ejs", { history: history })
	}
}
