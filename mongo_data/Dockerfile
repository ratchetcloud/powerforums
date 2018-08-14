FROM mongo

COPY databaseExport/1.1/nodes.json nodes.json
COPY databaseExport/1.1/users.json users.json
COPY databaseExport/1.1/userGroups.json userGroups.json

CMD mongoimport --host mongodb --db powerforums --collection nodes < nodes.json && \
    mongoimport --host mongodb --db powerforums --collection users < users.json && \
    mongoimport --host mongodb --db powerforums --collection userGroups < userGroups.json
