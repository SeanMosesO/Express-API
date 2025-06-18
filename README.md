# Express-API
Create a simple REST API with Express.js
Objective

The goal of this assessment is to evaluate your ability to create a simple REST API using Express.js. You will demonstrate an understanding of Node.js, Express.js, and RESTful API principles.

Task Breakdown

1. Setting Up the API

- Create a basic Express.js application
- Define a route for the root URL ("/") that returns a "Hello, World!" message
- Implement error handling for invalid routes
- Set up proper middleware (e.g.; express.json() for parsing request bodies)

2. Creating Routes Implement the following CRUD operations:

- GET /items - Retrieve all items
- GET /items/:id - Retrieve a single item by ID
- POST /items - Create a new item
- PUT /items/:id - Update an item by ID
- DELETE /items/:id - Delete an item by ID

3. Data Management

- Create a simple in-memory data store (array) to manage items
- Each item should have at least: id, name, and description
- Implement proper validation for incoming data

4. Error Handling

- Implement appropriate error responses (400, 404, 500)
- Return meaningful error messages
- Validate request parameters and body data 

5. Testing

- Provide example API requests using tools like Postman.

Submission Requirements

- Working Express.js application with all specified routes
- README.md with setup instructions and API documentation
- Example requests and expected responses

Responses to submission requirements

- Features:
CRUD routes for items (in-memory data store)

Validation

Error handling

README.md with setup + API docs

Example requests and responses
express-api/
├── app.js
├── routes/
│   └── items.js
├── data/
│   └── store.js
├── server.js
└── package.json

API Documentation
Base URL
VS Code Terminal
http://localhost:3000/api/items

Postman example
GET /
Fetch all items.

Response:
json
[
  {
    "id": 1,
    "name": "Item One",
    "description": "First item"
  }
]
GET /:id
Get item by ID.

404 Error:

json
{ "error": "Item not found" }
POST /
Create a new item.

Request Body:

json
{
  "name": "New Item",
  "description": "Description here"
}
Response:

json
{
  "id": 2,
  "name": "New Item",
  "description": "Description here"
}
PUT /:id
Update an existing item.

Request Body:

json
{
  "name": "Updated Item",
  "description": "Updated description"
}
404 Error:

json
{ "error": "Item not found" }
DELETE /:id
Deletes an item.

Response:

json
{ "message": "Item deleted" }
404 Error:

json
{ "error": "Item not found" }

Tech Used

Express.js
Node.js
