# MOPS

![MOPS Mascot](http://s17.postimg.org/5xdvcqdgv/Screen_Shot_2015_07_22_at_12_13_57_PM.png)


A command-line interface for performing [MongoDB Cloud Manager | Ops Manager](https://cloud.mongodb.com) tasks through their [Public API](https://docs.cloud.mongodb.com/api/).

## Benefits
* Easily do things from the terminal that are available to the UI and API.
* Quickly add new commands to automate things you'd like.
* Quickly move data back and forth between Cloud Manager an Ops Manager.
* Run custom analytics on permformance metrics data in Excel, R, etc.
* Leverages [node-mms-client JS API wrapper](https://github.com/leafygreen/node-mms-client), a Node wrapper around the public API.

## Installation

You can install the mops-cli npm [package](https://www.npmjs.com/package/mops-cli) directly.

`npm install -g mops-cli`


## Commands

The core `mops` commands are documented below.

* [configure](#configure)
  * [login](#configure-login)
  * [defaults](#configure-defaults)
* [groups](#groups)
  * [list](#groups-list)
  * [delete](#groups-delete)
  * [create](#groups-create)
* [hosts](#hosts)
  * [list](#hosts-list)
* [metrics](#metrics)
  * [csv](#metrics-csv)
* [alertConfigs](#alertConfigs)
  * [list](#alertConfigs-list)
  * [create](#alertConfigs-create)
  * [edit](#alertConfigs-edit)
* [automationConfig](#automationConfig)
  * [edit](#automationConfig-edit)

### configure

#### configure login
`mops configure login -h HOSTNAME -p PORT -u USERNAME -a APIKEY`

Set user credentials for MongoDB Cloud Manager | Ops Manager

| Options               | Description                                          | Default           |
| ----------------------|------------------------------------------------------|-------------------|
| -h, --host [host]     | The API endpoint hostname | cloud.mongodb.com |
| -p, --port [port]     | The API endpoint port | 443 |
| -P, --protocol [protocol]     | The API endpoint protocol | https |
| -u, --user [user]     | Email address or username accessing the API          |                   |
| -a, --apiKey [apiKey] | The specified user's API key                         |                   |

#### configure defaults
`mops configure defaults -g GROUPID`

Set defaults to prevent always specifying options on the command line.

| Options               | Description                                          | Default           |
| ----------------------|------------------------------------------------------|-------------------|
| -g, --groupId [groupId] | Group identifier                         |                   |

### groups

#### groups list
`mops groups list`

Display all current groups (JSON)

#### groups delete
`mops groups delete -n GROUPNAME`

Create new alert configurations

| Options                 | Description                                          | Default           |
| ------------------------|------------------------------------------------------|-------------------|
| -n, --name [name] | Group name                                     |        |

#### groups create
`mops groups create -n GROUPNAME`

### hosts

#### hosts list
`mops hosts list -g GROUPID`

Display all current hosts (JSON)

| Options                 | Description                                          | Default           |
| ------------------------|------------------------------------------------------|-------------------|
| -g, --groupId [groupId] | Group identifier                                     |                   |


### metrics

#### metrics csv
`mops metrics csv -g GROUPID -h HOSTID`

Export all metrics for the specified host in CSV format

| Options                 | Description                                          | Default           |
| ------------------------|------------------------------------------------------|-------------------|
| -g, --groupId [groupId] | Group identifier                                     |                   |
| -h, --hostId [hostId]   | Host identifier                                      |                   |
| -G, --granularity [granularity]   | Granularity                                | MINUTE            |
| -P, --period [period]   | Period                                               | P1DT24H           |

### alertConfigs

#### alertConfigs list
`mops alertConfigs list -g GROUPID`

Display all current alert configurations (JSON)

| Options                 | Description                                          | Default           |
| ------------------------|------------------------------------------------------|-------------------|
| -g, --groupId [groupId] | Group identifier                                     |                   |

#### alertConfigs create
`mops alertConfigs create -g GROUPID -f myAlerts.json`

Create new alert configurations

| Options                 | Description                                          | Default           |
| ------------------------|------------------------------------------------------|-------------------|
| -g, --groupId [groupId] | Group identifier                                     |                   |
| -f, --file [filename]   | JSON file of alert configs                           |                   |

#### alertConfigs edit
`mops alertConfigs edit -g GROUPID -i ALERTCONFIGID`

Edit specified alertConfig in your text editor

| Options                 | Description                                          | Default           |
| ------------------------|------------------------------------------------------|-------------------|
| -g, --groupId [groupId] | Group identifier                                     |                   |
| -i, --alertConfigId [alertConfigId]| Alert Configuration identifier            |                   |

### automationConfig

#### automationConfig edit
`mops automationConfig edit -g GROUPID`

Edit the current automationConfig in your text editor

| Options                 | Description                                          | Default           |
| ------------------------|------------------------------------------------------|-------------------|
| -g, --groupId [groupId] | Group identifier                                     |                   |


## Example Workflows

### Copying alerts configuration from one group to another
`mops alertConfigs list -g GROUPID > myAlerts.json`

`mops alertConfigs create -g GROUPID -f myAlerts.json`

*Note*: You can do a `mops configure login` between these two commands to change username, API key, even hosts (i.e., move from Cloud Manager to Ops Manager)

### Exporting host metrics into CSV format (for Excel, R, etc.)
Run `mops host list` to get a list of all the host IDs in your group.
Then run `mops metrics csv -g GROUPID -h HOSTID > hostMetrics.csv` to put all that host's metrics into a CSV file.


## License
Licensed under the [MIT license](LICENSE-MIT "MIT License").


## Contributors
* Dennis Kuczynski [@denniskuczynski](https://github.com/denniskuczynski)
* Emily Pakulski [@ohEmily](https://github.com/ohEmily)
* Peter Gravelle [@pcgMongo](https://github.com/pcgMongo)
* Daiji Shikama [@deerspace](https://github.com/deerspace)

## Chat with us

We're happy to discuss mops in our [Gitter](https://gitter.im/leafygreen/mops-cli) chatroom

## Shout Outs
mops-cli is a [MongoDB](http://www.mongodb.com) Skunkworks Project

![Friendly Skunk](http://s12.postimg.org/fxmtcosx9/skunkworks2.jpg)
