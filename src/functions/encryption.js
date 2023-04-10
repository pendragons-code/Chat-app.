// No dynamic handler because it has only 2 functions: encrypt and decrypt
// This is pretty badly done, this is because the whole thing is exposed... That means anyone can just use this to encrypt and decrypt.
const crypto = require("crypto")
const key = crypto.randomBytes(64)
const iv = crypto.randomBytes(16)
async function encrypt(message) {
	let cipher = crypto.createCipheriv("aes-256-ocb", Buffer.from(key), iv)
	let encrypted = cipher.update(message)
	encrypted = Buffer.concat([ encrypted, cipher.final() ])
	return { iv: iv.toString("hex"), encryptedData: encrypted.toString("hex") }
}
async function decrypt(text) {
	let iv = Buffer.from(text.iv, "hex")
	let encryptedText = Buffer.from(text.encryptedData, "hex")
	let decipher = crypto.createDecipheriv("aes-256-ocb", Buffer.from(key), iv)
	let decrypted = decipher.update(encryptedText)
	decrypted = Buffer.concat([decrypted, decipher.final()])
	return decrypted.toString()
}

module.exports = { decrypt, encrypt }
