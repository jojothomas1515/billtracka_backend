# BillTracka Backend

## Description

This is the backend for the BillTracka application. It is a RESTful API built with Node.js, Express, and PostgreSQL.
Deployed on Google Compute Engine Instance.

This API is used by the [BillTracka Frontend](https://billtracka-frontend.onrender.com) to manage user accounts, bills, and payments.

[Backend API](https://billtracka.jojothomas.tech)

## Installation

Clone the repository and install dependencies.

dependencies installation with npm
```bash
# after cloning the repository change directory to the project folder
$ cd billtracka_backend

# install dependencies with npm listed in package.json
$ npm install

# build the typescript files into the dist folder
$ npm run build

# start the server
$ npm start
```
## Environment Variables

The following environment variables are required to run the application. Create a .env file in the root directory of the project and add the following variables.

```bash
# .env file
PORT=3000
DBNAME=BILLTRACKADBNAME
DBUSERNAME=BILLTRACKADBUSERNAME
DBPWD=BILLTRACKADBPWD
DBHOST=BILLTRACKADBHOST
JWTSECRET=BILLTRACKAJWTSECRET
JWTREFRESHSECRET=BILLTRACKAJWTREFRESHSECRET
SMTPPORT=587
SMTPHOST=smtp.gmail.com
SMTPUSER=example@gmail.com
SMTPPASS=examplepassword
PAYSTACK_SECRET_KEY=sk_test_example
```

## API Documentation

API documentation is available at [API Documentation](https://billtracka.jojothomas.tech/api/docs)

Postman collection is available at [Postman Collection](https://www.postman.com/galactic-satellite-165852/workspace/billtracka)

## Author

[Jojo Thomas](https://github.com/jojothomas1515) - Backend Developer


