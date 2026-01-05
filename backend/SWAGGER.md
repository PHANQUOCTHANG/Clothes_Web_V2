# Swagger API Documentation

## Setup

Swagger has been configured for your API documentation. The swagger configuration is located in `src/config/swagger.ts`.

## Access Swagger UI

Once your server is running, you can access the Swagger UI at:

```
http://localhost:5000/api-docs
```

## Adding API Documentation

To add Swagger documentation to your endpoints, add JSDoc comments above your route definitions. Here's the pattern:

### Example for a GET endpoint:

```typescript
/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Get all products
 *     tags:
 *       - Products
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of products
 *       500:
 *         description: Server error
 */
```

### Example for a POST endpoint with authentication:

```typescript
/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     summary: Create new product
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Product created
 *       400:
 *         description: Invalid input
 */
```

## Configuration Details

### Supported API Files

The Swagger configuration currently scans these directories for documentation:

- `src/api/v1/routes/**/*.route.ts` - Route files
- `src/controllers/**/*.controller.ts` - Controller files

If you want to add documentation to other files, update the `apis` array in `src/config/swagger.ts`.

### Security

Bearer token authentication is configured. In Swagger UI, click the "Authorize" button to add your JWT token for testing protected endpoints.

## OpenAPI Specification

The API uses OpenAPI 3.0.0 specification. For more details on syntax and options, visit:
https://swagger.io/specification/

## Features Enabled

- ✅ JWT Bearer Token authentication
- ✅ Request/Response schema validation
- ✅ Authorization persistence in browser
- ✅ Full API endpoint documentation

## Next Steps

1. Add JSDoc comments to all your route files (in `src/api/v1/routes/`)
2. Visit `http://localhost:5000/api-docs` to see your API documentation
3. Test your endpoints directly from the Swagger UI
