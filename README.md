# PowerForums &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ratchetcloud/powerforums/blob/master/LICENSE) [![Coverage Status](https://coveralls.io/repos/github/ratchetcloud/powerforums/badge.svg?branch=dev-ys)](https://coveralls.io/github/ratchetcloud/powerforums?branch=dev-ys)  [![Build Status](https://travis-ci.org/ratchetcloud/powerforums.svg)](https://travis-ci.org/ratchetcloud/powerforums) 

Scalable forums with essentials forums features.


## Server
RESTFul API server for forums,
powered by [`express`](http://expressjs.com/) and [`mongodb`](https://www.mongodb.com/),
can be easily scale-out with state-less design.


## Client
Powered by [`react`](https://reactjs.org/) + [`redux`](https://redux.js.org/),
using [`webpack`](https://webpack.js.org/) and [`babel`](https://babeljs.io/) to support most browsers,
and can be deployed to static servers easily.


## How to install & run
Our services are packed with `Docker`, proudly, so you can easily start service with below script.

(Notice that you have to install Docker first before starting service)

```bash
$ docker-compose up 
```

Then open [http://localhost:4000](http://localhost:4000).


## Run without Docker

#### MongoDB import
```bash
$ cd mongo_data
$ mongoimport --db powerforums --collection nodes < databaseExport/1.1/nodes.json
$ mongoimport --db powerforums --collection users < databaseExport/1.1/users.json
$ mongoimport --db powerforums --collection userGroups < databaseExport/1.1/userGroups.json
```

#### Server
```bash
$ cd server
$ npm install 
$ npm run start
```

#### Client
```bash
$ cd client
$ npm install
$ npm run start
```
