# MMS CLI

A command-line interface for performing [MongoDB Management Service](https://mms.mongodb.com) tasks through their [Public API](http://mms.mongodb.com/help/core/api/).


## Documentation

### Login
```
mms login -u myUsername -a myApiKey
or
mms login -user myUsername -apiKey myApiKey
or (with prompt)
mms login
Required Field: user:  myUser
Required Field: apiKey:  myApiKey
```

### Topology
```
mms topology -g myGroupId
or (with prompt)
mms topology
```

![Topology Screenshot](http://i61.tinypic.com/kbuog5.png)

## Install with NPM

`npm install node-mms-client -g`

* https://www.npmjs.org/package/mms-cli


## License
Licensed under the [MIT license](LICENSE-MIT "MIT License").


## Shout Outs

mms-cli is a [MongoDB](http://www.mongodb.com) Skunkworks Project
![Friendly Skunk](http://s12.postimg.org/fxmtcosx9/skunkworks2.jpg)
