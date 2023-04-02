Docker compose for running all code.

API on port 3000, exposed on 3000.
Postgres available to API on port 5432.
Angular Frontend on port 4200, exposed on 4200.
Postgres admin on port 80, exposed on 5050.

### Clearing

`docker rmi -f $(docker images -a -q)`
`docker rm -vf $(docker ps -a -q)`

### Running locally

`docker compose up`

### Building

`docker compose build`

### TODOs
- Perpetuating database after close - need to handle this elegantly with export and import for example.

### Accessing database via PG Admin
Launch locally. Visit [localhost:5050](http://localhost:5050).

Login with these details:
Email: admin@admin.com
Password: password

Then 'Add new server'
Name: database
Connection: postgres
Maintenance Database: db
Username: user
Password: password