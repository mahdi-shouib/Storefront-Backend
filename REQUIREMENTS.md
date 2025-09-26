## API Endpoints

### Products

| Method | Endpoint                    | Description                               | Token Required | Arguments  |
|--------|-----------------------------|-------------------------------------------|----------------|------------|
| GET    | /products                   | Get all products                          | No             |            |
| GET    | /products/:id               | Get a product by id                       | No             | product id |
| POST   | /products                   | Create a new product                      | Yes            |            |

### Users

| Method | Endpoint                    | Description                               | Token Required | Arguments |
|--------|-----------------------------|-------------------------------------------|----------------|---------- |
| GET    | /users                      | Get all users                             | Yes            |           |
| GET    | /users/:id                  | Get a user by id                          | Yes            | user id   |
| POST   | /users                      | Create a new user                         | Yes            |           |

### Orders

| Method | Endpoint                    | Description                               | Token Required | Arguments                 |
|--------|-----------------------------|-------------------------------------------|----------------|---------------------------|
| POST   | /orders                     | Create a new order                        | Yes            |                           |
| POST   | /orders/:id/products        | Add a product to an order by id           | Yes            | order id                  |
| GET    | /users/:id/orders/:status   | Get open or complete orders by user id    | Yes            | user id, open or complete |

## Data Shapes

### Product

| Column   | Type                        |
|----------|-----------------------------|
| id       | integer SERIAL PRIMARY KEY  |
| name     | varchar(64) NOT NULL        |
| price    | integer NOT NULL            |
| category | varchar(32)                 |

### User

| Column    | Type                        |
|-----------|-----------------------------|
| id        | integer SERIAL PRIMARY KEY  |
| firstname | varchar(32) NOT NULL        |
| lastname  | varchar(32) NOT NULL        |
| password  | varchar(256) NOT NULL       |

### Orders

| Column  | Type                                            |
|---------|-------------------------------------------------|
| id      | integer SERIAL PRIMARY KEY                      |
| user_id | integer FOREIGN KEY users(id) ON DELETE CASCADE |
| status  | varchar(10) NOT NULL                            |

### Order Products

| Column     | Type                                               |
|------------|----------------------------------------------------|
| id         | integer SERIAL PRIMARY KEY                         |
| order_id   | integer FOREIGN KEY orders(id) ON DELETE CASCADE   |
| product_id | integer FOREIGN KEY products(id) ON DELETE CASCADE |
| quantity   | integer NOT NULL                                   |

### Example Endpoints Arguments

Examples of body arguments for the POST endpoints:

#### 1. /products (Create Product)

```json
{
  "name": "Product Name",
  "price": 100,
  "category": "Product Category" // Optional
}
```

#### 2. /users (Create User)

```json
{
  "firstname": "First Name",
  "lastname": "Last Name",
  "password": "Password123"
}
```

#### 3. /orders (Create Order)

```json
{
  "user_id": 1,
  "status": "open" // only accepts "open" or "complete"
}
```

#### 4. /orders/:id/products (Add Product to Order)

```json
{
  "product_id": 1,
  "quantity": 5
}
```