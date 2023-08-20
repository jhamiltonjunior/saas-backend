# Divisão

cada pasta dentro desse repository é equivalente a um service

# Preparing the environment

## You need:

- [ ] Nodejs
- [ ] npm
- [ ] PostgreSQL

or

- [ ] Docker

# To start the project on your machine

```bash
git clone <LINK_OF_REPOSITORY>
cd <DIRECTORY_NAME>
```
`git clone LINK_OF_REPOSITORY` download the repository
`cd <DIRECTORY_NAME>` open the directory

# Initial application

run `docker-compose up` in your terminal

# Initialize application

## run database

A exemple of main commands is:

```
docker pull postgres
docker run -d --name [YOUR_CONTAINER_NAME] -p 5432:5432 -e "POSTGRES_PASSWORD=[YOUR_PASSWORD]" [IMAGE_NAME]
docker exec -it [ container-name ] psql -U [ postgres-user ]
```

## How to I use
```
docker pull postgres
docker run -d --name postgres-server -p 5432:5432 -e "POSTGRES_PASSWORD=0000" postgres
docker exec -it postgres-server psql -U postgres
```

In your file .env you need insert IP of your container in ```DB_HOST```, for this use:
```
sudo docker inspect --format '{{ .NetworkSettings.IPAddress }}' [CONTAINER_ID]
```

# Para usar o pgAdmin

```bash
docker pull dpage/pgadmin4

docker network create --driver bridge postgres-network

docker run --name teste-postgres --network=postgres-network -e "POSTGRES_PASSWORD=Postgres2018!" -p 5432:5432 -v /home/renatogroffe/Desenvolvimento/PostgreSQL:/var/lib/postgresql/data -d postgres

docker run --name pgadmin --network=postgres-network -p 15432:80 -e "PGADMIN_DEFAULT_EMAIL=josehamiltonsantosjunior@yahoo.com.br" -e "PGADMIN_DEFAULT_PASSWORD=admin" -d dpage/pgadmin4

http://localhost:15432
```

<!-- run `docker-compose up` in your terminal -->