const express = require("express")
const helmet = require("helmet")
const env = require("dotenv").config()
const { join } = require("path")
const app = express()
const port = process.env.port || 3000
const frontEnd = require("./frontEnd.js")
const { decrypt, encrypt } = require("./../functions/encryption.js")
const http = require("http")
const server = http.createServer(app)

if(!port) console.log("Port is empty and will be assumed to be 3000.")

app.use(function(req, res, next) {
	res.setHeader("Content-Security-Policy", "frame-ancestors 'self';")
	next()
})

app.use("/", frontEnd)

app.get("/enc", async (req, res) => {
	encryptedMessage = await encrypt(req.query.message)
	return res.json(encryptedMessage)
})

app.get("/dec", async (req, res) => {
	decryptedMessage = await decrypt(req.query.message)
	return res.json(decryptedMessage)
})
app.set("view engine", "ejs")
app.set("views", join(__dirname, "../frontEnd/views"))
app.use(express.static(join(__dirname, "../frontEnd/public")))
app.use(helmet())
app.use(function(req, res) {
	res.render("404.ejs")
})

server.listen((port), async () => {
	console.log(`Hanging onto dear life at ${process.pid}\n Currently listening at http://localhost:${port}`)
})

module.exports = { server }
