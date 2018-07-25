# PowerForums

Scalable forums with essentials forums features.


## Server
Powered by `express` and `mongodb`.
Include all `API`s used in client, and APIs are designed `RESTFul`.


## Client
Powered by `react` + `redux`.
Uses `webpack` and `babel` to serve web browsers.


## How to install

```bash
# Server Part
$ cd server
$ npm install 
$ mongoimport --db forums --collection nodes < /forums-backend/databaseExport/1.1/nodes.json
$ mongoimport --db forums --collection roles < /forums-backend/databaseExport/1.1/roles.json
$ mongoimport --db forums --collection users < /forums-backend/databaseExport/1.1/users.json

# Client Part
$ cd ../client
$ npm install 
```

## How to run
First, start API server.  
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
