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


## How to install

```bash
# Server Part
$ cd server
$ npm install 
$ mongoimport --db forums --collection nodes < databaseExport/1.1/nodes.json
$ mongoimport --db forums --collection roles < databaseExport/1.1/roles.json
$ mongoimport --db forums --collection users < databaseExport/1.1/users.json

# Client Part
$ cd ../client
$ npm install 
```

## How to run
Firstly, start API server.  
(MongoDB should be in running before starting this service.)

```bash
$ cd server
$ npm run start
```

Then open another terminal and start client with develop-mode

```bash
$ cd client
$ npm run start
```
