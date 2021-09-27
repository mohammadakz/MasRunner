# Node.JS Project: SlingAir!

<img src='frontend/src/assets/screenshots/header.png' style='width:100%' />

You just accepted the full-stack developer position at Slingshot Airlines!

They were really impressed with the work you did at Concordia Bootcamps. After a conversation with the CEO at the job fair, they hired you on the spot! They have project that they need to ship asap and are confident that you can deliver.

They have a new seat-booking app that is set to be released next week. You were told that _most_ of the work is already done, and that all that remains is to connect the different pieces to get it working.

You have been provided with a GitHub repo and little else.

When you asked if it was possible to speak to the dev that worked on the project before you came aboard, you are told "Nope. Not possible. He left without notice and on bad terms."

Looks like you're on your own...

![mvp gif](frontend/src/assets/screenshots/slingair_mvp.gif)

---

## The App

### Screenshots

<img src='frontend/src/assets/screenshots/seat-select.png' style='float:left;width:48%;margin-right:4%;' />
<img src='frontend/src/assets/screenshots/confirmed.png' style='float:left;width:48%' />

### Functionality

- When a user navigates to `http://localhost:3000`, they are presented with an input to enter the flight number.
- With the flight number, make a request to the server for the seating availability on that flight.
- When a response with seating is received, display the seating input as well as the form requesting user's information.
- User selects a seat, enters information and clicks 'Confirm'.
- Contact the server with the data, and wait for a success response to redirect to the `/confirmed` page.
- The confirmed page should display a confirmation message to the user with the info that they entered on the previous screen.
- Consider using localStorage to save the reservation id, to allow for retrieval if the user closes and reopens the browser.

## Project Setup

### The Frontend

1. Open a terminal in VS Code
2. Type `cd frontend`
3. Type `yarn install`

Use `yarn dev:frontend` to start the frontend dev environment.

### The Backend

1. Open _another_ terminal in VS Code
2. Type `cd backend`
3. Type `yarn install`

Use `yarn dev:backend` to start the backend dev environment.

![dual terminal](frontend/src/assets/screenshots/dual_terminal.gif)

## Developer Notes

There is a folder called `notes` that contains possible hints on what to do next...

---

## Requirements for Project Completion

In order for your project to be considered `DONE` (passing grade), you should have a working MVP of the app.

### Backend

1. Server endpoints are RESTful.
2. There are endpoints for the following actions:
   - retrieve all flight numbers
   - retrieve single flight data (seating)
   - retrieve all reservations
   - retrieve a single reservation
   - create a reservation
   - delete a reservation _This is a requirement, even though the FE of this is a stretch goal._
   - update a reservation _This is a requirement, even though the FE of this is a stretch goal._
3. server should respond in a _complete_ fashion.
   - Send the status and the json separately.
   - send the status in the json object as well.
   - when a request succeeds respond with requested `data`.
   - when a request fails, respond with the `data` that was sent to the server. _This makes it easier for FE developers to debug their code._
   - when a request does not need any data to be returned, provide a message explaining the status: i.e. "reservation deleted."

```js
res.status(200).json({ status: 200, data: {}, message: {} });
```

### Frontend

1. user can select a flight from a dropdown. _Current implementation of an input field is not ideal._
2. user can select an available seat.
3. user can enter their personal information.
4. user can view the flight confirmation page.
5. given a reservation `id`, user should be able to view her reservation.

_Note that mutated test data will be preserved as long as your server is running. It stays in memory. The changes will only be reset when the server is restarted._

### Database Integration: MongoDB

Migrate the data in `backend/data.js` to a brand-new MongoDB database.

In order to incorporate the Database, you will need to modify your backend as it will no longer modify the data in memory, but will use the database to complete all of the requests it receives from the frontend.

### Stretch

- Create an interface for users to modify their personal information and/or cancel their reservation at `/profile`.
- Create an admin interface at `/admin` to view all of the reservation. (The design is up to you.)
- Any other improvements that you would like to make! Go wild!
