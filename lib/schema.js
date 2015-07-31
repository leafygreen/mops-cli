var optionDescriptions = require('../lib/optionDescriptions');

module.exports = {
    Login: {
        properties: {
            host: {
                default: 'cloud.mongodb.com',
                message: optionDescriptions.HOST,
                required: false
            },
            port: {
                default: 443,
                message: optionDescriptions.PORT,
                required: false
            },
            protocol: {
                default: 'https',
                message: optionDescriptions.PROTOCOL,
                required: false
            },
            user: {
                message: optionDescriptions.USER,
                required: true
            },
            apiKey: {
                message: optionDescriptions.API_KEY,
                required: true,
                hidden: true
            }
        }
    },

    Group: {
        properties: {
            name: {
                message: optionDescriptions.GROUP_NAME,
                required: true
            }
        }
    },

    Host: {
        properties: {
            groupId: {
                message: optionDescriptions.GROUP_ID,
                required: true
            }
        }
    },

    Metric: {
        properties: {
            groupId: {
                message: optionDescriptions.GROUP_ID,
                required: true
            },
            hostId: {
                message: optionDescriptions.HOST_ID,
                required: true
            }
        }
    },

    AlertConfig: {
        properties: {
             groupId: {
                message: optionDescriptions.GROUP_ID,
                required: true
            }
        }
    },

    AutomationConfig: {
        properties: {
            groupId: {
                message: optionDescriptions.GROUP_ID,
                required: true
            }
        }
    },

    SSHKey: {
        properties: {
            name: {
                message: optionDescriptions.SSH_KEY_NAME,
                required: true
            },
            file: {
                default: '~/.ssh/id_rsa.pub',
                message: optionDescriptions.SSH_KEY_FILE,
                required: true
            },
            groupId: {
                message: optionDescriptions.GROUP_ID,
                required: true
            },
            provider: {
                message: optionDescriptions.PROVIDER,
                required: true
            }
        }
    }
};
