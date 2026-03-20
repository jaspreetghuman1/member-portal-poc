# Member Portal API (Proof of Concept)

This project is a simple backend proof of concept for a membership portal. It allows retrieving member details and registering members for events.

The goal of this implementation was to focus on a small, working backend that demonstrates API design, data persistence, and validation logic within a limited time.

---

## Tech Stack

- Node.js  
- TypeScript  
- Express  
- Prisma ORM  
- SQLite  

I chose this stack to keep the solution simple and easy to run locally, while still demonstrating a realistic backend setup with a database and typed queries.

---

## Setup Instructions

1. Clone the repository

2. Install dependencies:
 ```bash
   npm install
   ```

3. Run database migrations:
 ```bash
   npx prisma migrate dev
   ```

4. Seed the database:
 ```bash
   npx ts-node prisma/seed.ts
   ```

5. Start the development server:
 ```bash
   npx ts-node-dev src/index.ts
   ```

The server will run on:
http://localhost:3000



## API Endpoints

### 1. Get Member Details

**GET /members/:id**
Returns details of a specific member.
Example Request: GET /members/1

Example Response:
```json
{
  "data": {
    "id": 1,
    "fullName": "Jaspreet Singh",
    "email": "jaspreetghuman1@yahoo.com",
    "membershipStatus": "ACTIVE",
    "subscriptionExpiresAt": "2026-06-15T00:00:00.000Z",
    "createdAt": "2026-03-20T00:00:00.000Z"
  }
}
```

Possible Errors:
```json
{
  "error": "Member id must be a number"
}
```
or
```json
{
  "error": "Member not found"
}
```



### 2. Register for Event

**POST /events/:eventId/register**
Registers a member for an event.
Example Request : POST /events/1/register
Request Body:
```json
{
  "memberId": 1
}
```
Success Response:
```json
{
  "message": "Registration successful",
  "data": {
    "id": 1,
    "memberId": 1,
    "eventId": 1,
    "registeredAt": "2026-03-20T10:49:11.611Z"
  }
}
```
                
The registration endpoint includes the following validation:
  - eventId must be a valid number
  - memberId must be provided and must be a number
  - member must exist
  - event must exist
  - only active members can register
  - event must not be full
  - a member cannot register for the same event more than once
These checks ensure that basic business rules are enforced at the API level.

  

## Notes

Due to time constraints, I focused on implementing two core features:
 - retrieving a member record
 - registering a member for an event

This allowed me to demonstrate API design, database usage, and validation without overcomplicating the solution.
I chose not to implement authentication, frontend UI, or additional endpoints in order to keep the solution clean and complete within the available time.