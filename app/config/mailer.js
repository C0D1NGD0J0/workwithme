"use strict";

module.exports = {
	mailerConfig: {
		service: "Gmail",
		auth: {
			user: process.env.GMAIL_USERNAME,
			pass: process.env.GMAIL_PASSWORD
		}
	}
}