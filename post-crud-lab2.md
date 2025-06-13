# 🧪 Lab: Build a CRUD API for Post Entity with Clean Architecture

## 🎯 Objective

Create a RESTful API for managing **Post** resources using **Node.js**, **Express**, and **MongoDB**. The API must follow a modular and clean project structure and implement full CRUD functionality with proper error handling.

---

## 1. Initialize the Project

- Create a new folder for your project and initialize it with `npm`.
- Install the required packages:
  - `express`, `mongoose`, `cors`, `morgan`
  - `nodemon` as a dev dependency

---

## 2. Structure Your Codebase

Restructure your project directory as follows:

```
- **Routers:** Create a folder for all your route definitions.
- **Models:** Create a folder for your database schemas and models.
- **Controllers:** Create a folder for your business logic and request handling.

---

## 3. Create a Mongoose Product Model

Define a schema for a Product with at least the following fields:

- `title` (String, required)
- `description` (String, optional)

---

## 4. Implement CRUD Operations

Create controller functions to handle:

- `POST /api/posts` → Create a new post
- `GET /api/posts` → Get all posts
- `GET /api/posts/:id` → Get a post by ID
- `PATCH /api/posts/:id` → Update a post
- `DELETE /api/posts/:id` → Delete a post

Use async/await and Mongoose methods.

---

## 5. Create Routes

Define RESTful routes for the post entity and link them to your controller functions.

Use an Express router and export it from `routes/postRoutes.js`.

---



## 6. Connect to MongoDB

Use `mongoose.connect()` to connect to a MongoDB database.

You may use a local instance or MongoDB Atlas.

---

## 8. Test Your Enhancements

Use **Postman** or any API client to test the API.

- ✅ Create a post
- ✅ Fetch all posts
- ✅ Fetch a post by ID
- ✅ Update a post
- ✅ Delete a post


---

## ✅ Bonus (Optional)

- Use environment variables (`dotenv`) to manage DB connection strings and port numbers.

---

## 🏁 Submission

When you're done:

- Ensure your project is running without errors.

---

Happy coding ❤️!
```
