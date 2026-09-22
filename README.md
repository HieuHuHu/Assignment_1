Nguyễn Phồn Hiếu
HE191632

# Article and Comment API

Base URL: `http://localhost:3000`

## Article APIs

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/articles` | Get all articles |
| GET | `/articles/:id` | Get an article by ID |
| POST | `/articles` | Add a new article |
| PUT | `/articles/:id` | Update an article |
| DELETE | `/articles/:id` | Delete an article |

## Comment APIs

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/comments` | Get all comments |
| GET | `/comments/:id` | Get a comment by ID |
| POST | `/comments` | Add a new comment |
| PUT | `/comments/:id` | Update a comment |
| DELETE | `/comments/:id` | Delete a comment |

## Article Comment APIs

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/article/:id/comments` | Get all comments for an article |
| GET | `/articles/:id/comments` | Alternative URL for article comments |

## Response Status Codes

- `200 OK`: Request completed successfully
- `201 Created`: Article or comment created successfully
- `204 No Content`: Article or comment deleted successfully
- `400 Bad Request`: Invalid request data
- `404 Not Found`: Article or comment does not exist

## Request Body Examples

Create or update an article:

```json
{
	"title": "New article",
	"content": "Article content",
	"author": "Author name",
	"date": "2026-09-22"
}
```

Create or update a comment:

```json
{
	"articleId": 1,
	"author": "Author name",
	"content": "Comment content",
	"date": "2026-09-22"
}
```

## Testing Checklist

Use `http://localhost:3000` as the base URL in Postman.

### Article Tests

| Method | URL | Expected result |
| --- | --- | --- |
| GET | `/articles` | `200 OK` |
| GET | `/articles/1` | `200 OK` |
| GET | `/articles/999` | `404 Not Found` |
| POST | `/articles` | `201 Created` with a valid article body |
| POST | `/articles/1` | `404 Not Found` because POST does not use an ID |
| POST | `/articles/999` | `404 Not Found` because POST does not use an ID |
| PUT | `/articles/1` | `200 OK` with a valid article body |
| PUT | `/articles/999` | `404 Not Found` |
| DELETE | `/articles/1` | `204 No Content` |
| DELETE | `/articles/999` | `404 Not Found` |

### Comment Tests

| Method | URL | Expected result |
| --- | --- | --- |
| GET | `/comments` | `200 OK` |
| GET | `/comments/1` | `200 OK` |
| GET | `/comments/999` | `404 Not Found` |
| POST | `/comments` | `201 Created` with a valid comment body |
| POST | `/comments/1` | `404 Not Found` because POST does not use an ID |
| POST | `/comments/999` | `404 Not Found` because POST does not use an ID |
| PUT | `/comments/1` | `200 OK` with a valid comment body |
| PUT | `/comments/999` | `404 Not Found` |
| DELETE | `/comments/1` | `204 No Content` |
| DELETE | `/comments/999` | `404 Not Found` |

## Postman Results

The screenshots below show the API responses in Postman.

### API Health Check

`GET http://localhost:3000/` returns `200 OK` and confirms that the API is running.

![GET API health check](image.png)

### Get Articles

`GET http://localhost:3000/articles` returns `200 OK` with the complete article list.

![GET all articles](image-1.png)

### Get Comments

`GET http://localhost:3000/comments` returns `200 OK` with the complete comment list.

![GET all comments](image-2.png)

### Get Comments By Article

Use a real article ID, for example:

`GET http://localhost:3000/article/1/comments`

This returns `200 OK` with comments belonging to article `1`. Using the literal URL `/article/:id/comments` returns `404` because `:id` is only a route placeholder.

![GET comments by article](image-3.png)

### Create Article

Use `POST http://localhost:3000/articles` with Body > raw > JSON:

```json
{
	"title": "New article",
	"content": "Article content",
	"author": "Author name",
	"date": "2026-09-22"
}
```

A valid request returns `201 Created`. The screenshot shows `400 Bad Request` because the request body was empty.

![POST article](image-4.png)

### Create Comment

Use `POST http://localhost:3000/comments` with Body > raw > JSON:

```json
{
	"articleId": 1,
	"author": "Author name",
	"content": "Comment content",
	"date": "2026-09-22"
}
```

A valid request returns `201 Created`. The screenshot shows `400 Bad Request` because the request body was empty.

![POST comment](image-5.png)