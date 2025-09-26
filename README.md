# Storefront Backend

This is the backend for a storefront server application built with **Node.js**, **TypeScript**, **Express**, and tested with **Jasmine**. It provides RESTful APIs endpoints to manage products, users, and orders. The Endpoints use **JWT**s for authentication as well as password hashing. All of the data is stored in a **PostgreSQL** database and containerized in a **Docker** container.

## Setup

### 1. Clone the Repository and Install Global Dependencies

```bash
git clone https://github.com/mahdi-shouib/Storefront-Backend.git

cd Storefront-Backend

npm i yarn db-migrate -g
```

### 2. Install Dependencies

Run the following command to install dependencies:

```bash
yarn
```

> [!NOTE]  
> You may see errors for an optional dependency called cpu-features, you can safely ignore these errors.

### 3. .env File

> [!IMPORTANT]  
> Normally .env files should **NEVER** be pushed to a public repository, but as this is a project submission, its values have been included below for the reviewer.

**1.** Create the .env file:

```bash
type nul > .env
```

**2.** Open the .env file and add the following values:

```bash
POSTGRES_HOST=localhost
POSTGRES_DB=storefront_dev
POSTGRES_TEST_DB=storefront_test
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin1234
TOKEN_SECRET=MyWebTokenSecret321
BCRYPT_SECRET=BcryptPass123
SALT_ROUNDS=10
ENV=dev
```

### 4. Run Docker Container

Make sure you have Docker Desktop installed and running on your machine. Then run:

```bash
docker compose up
```

The Postgres Docker image will be downloaded and a container will be created and started.

> [!Tip]  
> If you face any issues regarding volumes, try running this command first:
>
> ```bash
> docker compose down -v
> ```

### 5. Build and Run

Now the Docker container is running, you can proceed to build and run the project.  
In a separate terminal, run the following commands in the project root directory:

**1.** Build the project:

```bash
yarn build
```

**2.** Run the server:

```bash
yarn start
```

The server will start running at: `http://localhost:3000`

If at anypoint you decide to reset the database, you can run:

```bash
db-migrate reset
db-migrate up
```

> [!CAUTION]  
> Resetting the database will delete all existing data

## Usage

You can use [Postman](https://www.postman.com/) or any other API testing tool to use the endpoints.

Refer to [The Requirements](./REQUIREMENTS.md) for more info on the API endpoints and data shapes.

> [!IMPORTANT]  
> I dont know if its a design flaw or me not understanding the requirements correctly, but how can a user require a token to be created? The user wont have a token yet! So I made it so that the root route returns a valid token for the user to use. But in a logical scenario, the user should be able to create an account without a token.
> Be sure to send the token in the `Authorization` header as `Bearer <token>` for the endpoints that require a token.

## Testing

To run the tests, make sure the Docker container is running, then run the following command:

```bash
yarn test
```

> [!IMPORTANT]  
> This command won't work on Windows Command Prompt, you need to use Git Bash.

> [!NOTE]  
> The tests use a separate test database, so your development database will not be affected.

## Contributing

Contributions are welcome!  
Please open an issue or submit a pull request.
