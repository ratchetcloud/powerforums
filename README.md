# forums-backend

Opensource game forum *backend* (espcially API server) part.
Works with `express`, `mongodb` and `mongoose`.

## How to install

```bash
$ npm install 
$ mongoimport --db forums --collection nodes < /forums-backend/databaseExport/1.1/nodes.json
$ mongoimport --db forums --collection roles < /forums-backend/databaseExport/1.1/roles.json
$ mongoimport --db forums --collection users < /forums-backend/databaseExport/1.1/users.json
```



## How to run

MongoDB should be in running before starting this service.

```bash
$ npm run start
```

