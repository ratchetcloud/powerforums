FROM mongo

COPY databaseExport/1.1/nodes.json nodes.json
COPY databaseExport/1.1/roles.json roles.json
COPY databaseExport/1.1/users.json users.json

CMD mongoimport --host mongodb --db powerforums --collection nodes < nodes.json && \
    mongoimport --host mongodb --db powerforums --collection roles < roles.json && \
    mongoimport --host mongodb --db powerforums --collection users < users.json
