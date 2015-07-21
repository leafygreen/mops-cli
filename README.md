```
           ___  ___  __
  /\/\    /___\/ _ \/ _\
 /    \  //  // /_)/\ \
/ /\/\ \/ \_// ___/ _\ \
\/    \/\___/\/     \__/

```

A command-line interface for performing [MongoDB Cloud Manager | Ops Manager](https://cloud.mongodb.com) tasks through their [Public API](http://mms.mongodb.com/help/core/api/).

## Installation

You can install the mops-cli npm package directly.

`npm install -g mops-cli`


## Commands

The core mops-cli commands are documented below.

Resource identifiers are cached such that they do not need to be specified every time. For example, if `mops-cli groups list --groupId <myGroupId>` is executed.  Future commands will assume `<myGroupId>` is the active groupId and it does not need to be respecified.

When using `edit` commands to edit JSON in your text editor.  Your preferred text editor should be specified in the `EDITOR` environment variable.

* [login](#login)
* [metrics](#metrics)
  * [csv](#metrics-csv)

### login
`mops-cli login -h ops-manager.example.com -u me@example.com -a 55807ce0e4b0ce4c2b652f48`

Set user credentials for MongoDB Cloud Manager | Ops Manager

| Options               | Description                                          | Default           |
| ----------------------|------------------------------------------------------|-------------------|
| -h, --host [host]     | Host with optional port specifiying the API endpoint | cloud.mongodb.com |
| -u, --user [user]     | Email address or username accessing the API          |                   |
| -a, --apiKey [apiKey] | The specified user's API key                         |                   |
```

### metrics

#### metrics csv
`mops-cli metrics csv -g 55807ce0e4b0ce4c2b652f48 -h 3927a5536e36ce4885424e382f9f0b2f`

Export all metrics for the specified host in CSV format

| Options                 | Description                                          | Default           |
| ------------------------|------------------------------------------------------|-------------------|
| -g, --groupId [groupId] | Group identifier                                     | (last used)       |
| -h, --hostId [hostId]   | Host identifier                                      | (last used)       |
| -g, --granularity [granularity]   | Granularity                                | MINUTE            |
| -p, --period [period]   | Period                                               | P1D24H            |
```

## Example Workflows

TODO


## License
Licensed under the [MIT license](LICENSE-MIT "MIT License").


## Contributers
* Dennis Kuczynski @denniskuczynski
* Emily Pakulski @ohEmily
* Peter Gravelle @pcgMongo


## Shout Outs

mops-cli is a [MongoDB](http://www.mongodb.com) Skunkworks Project


![Friendly Skunk](http://s12.postimg.org/fxmtcosx9/skunkworks2.jpg)
