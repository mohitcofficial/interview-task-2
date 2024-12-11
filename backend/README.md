# Backend API Documentation

## `/users/signup` Endpoint

### Description

Registers a new user by creating a user account with the provided information. But needs to verify using email within 2 mins or have to register again.

### HTTP Method

`POST`

### Request Body

The request body should be in JSON format and include the following fields:

- `name`(string, required): User's first name (minimum 2 characters).
- `email` (string, required): User's email address (must be a valid email).
- `password` (string, required): User's password

### Example Response

- `success` (boolean): true
- `message` (String): message

## `/admin/signup` Endpoint

### Description

Registers a new admin by creating a user account with the provided information. No email verification required for admin since security key is need for him.

### HTTP Method

`POST`

### Request Body

The request body should be in JSON format and include the following fields:

- `name`(string, required): User's first name (minimum 2 characters).
- `email` (string, required): User's email address (must be a valid email).
- `password` (string, required): User's password
- `securityKey` (string, required): Security Key=mohitchandra

### Example Response

- `success` (boolean): true
- `message` (String): message

## `/verify` Endpoint

### Description

Verify the user with verification token present in the body of the request. Note: only valid for 2 mins after the generation.

### HTTP Method

`POST`

### Request Body

The request body should be in JSON format and include the following fields:

- `token` (string, required): Verification token

### Example Response

- `success` (boolean): true
- `message` (String): message

## `/users/login` Endpoint

### Description

Authenticates a user using their email and password, returning a JWT token in cookie upon successful login.

### HTTP Method

`POST`

### Endpoint

`/login`

### Request Body

The request body should be in JSON format and include the following fields:

- `email` (string, required): User's email address (must be a valid email).
- `password` (string, required): User's password.

### Example Response

- `user` (object):
  - `name`(string, required): User's first name (minimum 2 characters).
  - `email` (string): User's email address (must be a valid email).
  - `password` (string): User's password.
- `token` (String): JWT Token
- `success` (boolean): true
- `message` (String): message

## `/users/profile` Endpoint

### Description

Retrieves the profile information of the currently authenticated user.

### HTTP Method

`GET`

### Authentication

Requires a valid JWT token in the cookie:
`authToken`

### Example Response

- `user` (object):
  - `name`(string, required): User's first name (minimum 2 characters).
  - `email` (string): User's email address (must be a valid email).
- `success` (boolean): true
- `message` (String): message

## `/logout` Endpoint

### Description

Logout the current user and remove the token provided in cookie form the database

### HTTP Method

`POST`

### Authentication

Requires a valid JWT token in the cookie:
`authToken`

### Example Response

- `success` (boolean): true
- `message` (String): message

## `/blog` Endpoint

### Description

Create a new blog, only authorized to admin.

### HTTP Method

`POST`

### Request Body

The request body should be in JSON format and include the following fields:

- `title`(string, required): title
- `content` (string, required): blogs content
- `author` (string, required): blogs author

### Example Response

- `blog` (object): blog info
- `success` (boolean): true
- `message` (String): message

## `/blog/:id` Endpoint

### Description

Update a blog, only authorized to admin.

### HTTP Method

`PUT`

### Params

Require Blog ID in params.

### Request Body

The request body should be in JSON format and include the following fields:

- `title`(string, required): title
- `content` (string, required): blogs content
- `author` (string, required): blogs author

### Example Response

- `blog` (object): updated blog info
- `success` (boolean): true
- `message` (String): message

## `/blog/:id` Endpoint

### Description

Delete a blog, only authorized to admin.

### HTTP Method

`DELETE`

### Params

Require Blog ID in params.

### Example Response

- `blog` (object): deleted blog info
- `success` (boolean): true
- `message` (String): message

## `/blog/:id` Endpoint

### Description

Get blog information.

### HTTP Method

`GET`

### Params

Require Blog ID in params.

### Example Response

- `blog` (object): blog info
- `success` (boolean): true
- `message` (String): message

## `/blogs` Endpoint

### Description

Get all blog information with paginated.

### HTTP Method

`GET`

### Example Response

- `blogs` (array): blogs information with pagination
- `success` (boolean): true
- `message` (String): message

### Error Response

- `400 Bad Request`: If any required parameter is missing or invalid.
- `500 Internal Server Error`: If there is an error calculating the fare.

```json
{
  "message": "Error message"
}
```
