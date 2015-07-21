var optionDescriptions = require('../lib/optionDescriptions');

this.Group = {
	properties: {
		'name': {
			message: optionDescriptions.GROUP_NAME,
			required: true
		}
	}
}


this.Login = {
	properties: {
        host: {
            default: 'cloud.mongodb.com',
            message: optionDescriptions.HOST,
            required: true
        },
        user: {
            message: optionDescriptions.USER,
            required: true
        },
        apiKey: {
            message: optionDescriptions.API_KEY_,
            required: true,
            hidden: true
        }
    }
}