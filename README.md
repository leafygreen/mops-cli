# MOPS

![MOPS Mascot](http://s1.postimg.org/7o31oh1un/Screen_Shot_2015_07_22_at_12_13_57_PM.png)


A command-line interface for performing [MongoDB Cloud Manager | Ops Manager](https://cloud.mongodb.com) tasks through their [Public API](http://mms.mongodb.com/help/core/api/).

## Installation

You can install the mops-cli npm package directly.

`npm install -g mops-cli`


## Commands

The core mops-cli commands are documented below.

* [login](#login)
* [groups](#groups)
  * [list](#groups-list)
  * [delete](#groups-delete)
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

### login
`mops-cli login -h ops-manager.example.com -u me@example.com -a 55807ce0e4b0ce4c2b652f48`

Set user credentials for MongoDB Cloud Manager | Ops Manager

| Options               | Description                                          | Default           |
| ----------------------|------------------------------------------------------|-------------------|
| -h, --host [host]     | Host with optional port specifiying the API endpoint | cloud.mongodb.com |
| -u, --user [user]     | Email address or username accessing the API          |                   |
| -a, --apiKey [apiKey] | The specified user's API key                         |                   |

### groups

#### groups list
`mops-cli groups list`

Display all current groups (JSON)

#### groups delete
`mops-cli groups delete -n myGroupname`

Create new alert configurations

| Options                 | Description                                          | Default           |
| ------------------------|------------------------------------------------------|-------------------|
| -n, --name [name] | Group name                                     |        |

### hosts

#### hosts list
`mops-cli hosts list -g 55807ce0e4b0ce4c2b652f48`

Display all current hosts (JSON)

| Options                 | Description                                          | Default           |
| ------------------------|------------------------------------------------------|-------------------|
| -g, --groupId [groupId] | Group identifier                                     | (last used)       |


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

### alertConfigs

#### alertConfigs list
`mops-cli alertConfigs list -g 55807ce0e4b0ce4c2b652f48`

Display all current alert configurations (JSON)

| Options                 | Description                                          | Default           |
| ------------------------|------------------------------------------------------|-------------------|
| -g, --groupId [groupId] | Group identifier                                     | (last used)       |

#### alertConfigs create
`mops-cli alertConfigs create -g 55807ce0e4b0ce4c2b652f48 -f myAlerts.json`

Create new alert configurations

| Options                 | Description                                          | Default           |
| ------------------------|------------------------------------------------------|-------------------|
| -g, --groupId [groupId] | Group identifier                                     | (last used)       |
| -f, --file [filename]   | JSON file of alert configs                           |                   |

#### alertConfigs edit
`mops-cli alertConfigs edit -g 55807ce0e4b0ce4c2b652f48 -i 55807ce0e4b0ce4c2b652f48`

Edit specified alertConfig in your text editor

| Options                 | Description                                          | Default           |
| ------------------------|------------------------------------------------------|-------------------|
| -g, --groupId [groupId] | Group identifier                                     | (last used)       |
| -i, --alertConfigId [alertConfigId]| Alert Configuration identifier            | (last used)       |

### automationConfig

#### automationConfig edit
`mops-cli automationConfig edit -g 55807ce0e4b0ce4c2b652f48`

Edit the current automationConfig in your text editor

| Options                 | Description                                          | Default           |
| ------------------------|------------------------------------------------------|-------------------|
| -g, --groupId [groupId] | Group identifier                                     | (last used)       |


## Example Workflows

### Copying alerts configuration from one group to another
`mops-cli alertConfigs list -g 55807ce0e4b0ce4c2b652f48 > myAlerts.json`

`mops-cli alertConfigs create -g 55807ce0e4b0ce4c2b652f84 -f myAlerts.json`

*Note*: You can do a `mops-cli login` between these two commands to change username, API key, even hosts (i.e., move from Cloud Manager to Ops Manager)

### Grabbing a host's output in CSV (for Excel, etc.)
Run `mops-cli host list` to get a list of all the host IDs in your group.
Then run `mops-cli metrics csv -g GROUPID -h HOSTID > hostMetrics.csv` to put all that host's metrics into a CSV file.



## License
Licensed under the [MIT license](LICENSE-MIT "MIT License").


## Contributors
* Dennis Kuczynski @denniskuczynski
* Emily Pakulski @ohEmily
* Peter Gravelle @pcgMongo


## Shout Outs

mops-cli is a [MongoDB](http://www.mongodb.com) Skunkworks Project


![Friendly Skunk](http://s12.postimg.org/fxmtcosx9/skunkworks2.jpg)
