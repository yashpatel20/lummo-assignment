# Lummo In Memory Store

## Description

Developed an in memory store with the following exposed apis

1. GET /get/:key
2. POST /set
3. GET /search?prefix=&suffix=
4. GET /metrics

## How to Run

### Local

1. Run npm run install
2. Run npm run build
3. Create a .env file with PORT=3000 and ENV=DEV vars
4. Run npm run start

### Container

1. Run docker build . -t lummo
2. Run docker run -d -p 3000:3000 --env PORT=3000 --env ENV=DEV lummo

## Deployment

Kubernetes deployment related yaml files are in /deploy folder.

## Tests

1. Run npm run test
