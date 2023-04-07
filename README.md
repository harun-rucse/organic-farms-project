# Organic Farms

A platform for connecting consumers directly with organic farmers, offering fair prices and quality products. This is our Final year group project.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them:

- Node.js
- MongoDB
- React
- Express

### Installing

A step by step series of examples that tell you how to get a development environment running:

1. Clone the repository

```
git clone https://github.com/harun-rucse/organic-farms.git
```

2. Install dependencies

```
yarn
```

3. Start the development server

```
yarn dev
```

## Run Docker in development

```
docker-compose -f docker-compose.dev.yml up -d --build
```

## Run Docker in production

```
docker-compose -f docker-compose.prod.yml up -d --build
```

## Seed development data into databse

```
yarn run seed --refresh
```

## Deployment

Add additional notes about how to deploy this on a live system.

## Built With

- [Node.js](https://nodejs.org/) - The JavaScript runtime used on the back-end
- [MongoDB](https://www.mongodb.com/) - The database used to store data
- [React](https://reactjs.org/) - The JavaScript library used on the front-end
- [Express](https://expressjs.com/) - The back-end web framework used to build the API
