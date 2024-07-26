# PLANNER API

### **INTRODUCTION**

Thinking about a new client that appeared in the market, Compass UOL had the idea of creating a planner. This planner will help the client to organize his week and his tasks and at what times they happen.

---

### **PROJECT FEATURES**

```ruby
GET

- Get all events registered at a file.
- Get all events related to a weekday from a file.
- Get a single event by passing its unique id.

POST

- Create a signup user that must follow a valid pre-defined body.
- Create a signin user that must follow a valid pre-defined body.
- Create an event using a valid predefined body that can automatically register its creation time and generate a new id.

DELETE

- Delete a single event by passing its id.
- Delete all events related to a day of the week by passing the respective weekday.
```

---

### **INSTALLATION GUIDE**

> [!IMPORTANT]
> Ensure that you are working from the main branch, it is the most stable at any given time for this project.

- Run `$ npm install` to install all the dependencies needs.

- Make sure that you have all that dependencies in your `package.json` file: _express_, _morgan_ and _nodemon_.

- If something goes wrong with the installation it is possible to install manually following the next commands at the console:

```ruby
$ npm install express@4
$ npm install nodemon --save-dev
$ npm install morgan
```

> [!WARNING]
> This project was developed using a 4-Major express version, so it's recommended to use the same version.

---

### **USAGE**

Run `$ npm start` at the console, the script should automatically execute `$ server.js`.

### **API ENDPOINTS**

| **HTTP VERB** | **ENDPOINT**                 | **ACTION**              |
| ------------- | ---------------------------- | ----------------------- |
| GET           | api/v1/events                | get all events          |
| GET           | api/v1/events/{dayOfTheWeek} | get events by weekday   |
| GET           | api/v1/events/{id}           | get event by id         |
| POST          | api/v1/users/signUp          | create new signUp user  |
| POST          | api/v1/users/signIn          | create new signIn user  |
| POST          | api/v1/events                | create event            |
| DELETE        | api/v1/events/{id}           | delete event by id      |
| DELETE        | api/v1/events/{dayOfTheWeek} | delete event by weekday |

---

### **TEST WITH POSTMAN**

> [!NOTE]
> For getting or deleting an event using {dayOfTheWeek} as endpoint, weekday must be passed using only lowercase letters and written at EN-US.

```ruby
- At data folder:

  All events updates can be seen at `events.json` file.
  All users signup posts can be found at `users-sign-up.json` file.
  All users signin posts can be found at `users-sign-in.json` file.
```

> [!TIP]
> For better visual experience for .json files, at Visual studio code, you can use the auto-format shortcut key: _Windows Shift + Alt + F_ | _Mac Shift + Option + F_ | _Linux Ctrl + Shift + l_.

- Expected response for **GET** all events `api/v1/events`:

```json
  [{
  "_id" : "string",
  "description" : "string",
  "dateTime" : "ISO 8601 UTC format",
  "createdAt" : "ISO 8601 UTC format"
  }, ...]
```

- Expected response for **GET** events by weekday `api/v1/events/{dayOfTheWeek}`:

```json
  [{
  "_id" : "string",
  "description" : "string",
  "dateTime" : "ISO 8601 UTC format",
  "createdAt" : "ISO 8601 UTC format"
  }, ...]
```

- Expected response for **GET** events by id `api/v1/events/{id}`:

```json
[
  {
    "_id": "string",
    "description": "string",
    "dateTime": "ISO 8601 UTC format",
    "createdAt": "ISO 8601 UTC format"
  }
]
```

- Expected request body for **POST** user sign-up `api/v1/users/signUp`:

```json
{
  "firstName": "string",
  "lastName": "string",
  "birthDate": "string",
  "city": "string",
  "country": "string",
  "email": "string",
  "password": "string",
  "confirmPassword": "string"
}
```

- Expected request body for **POST** user sign-in `api/v1/users/signIn`:

```json
{
  "email": "string",
  "password": "string"
}
```

- Expected request body for **POST** event `api/v1/events`:

```json
{
  "description": "string",
  "dateTime": "ISO 8601 UTC format"
}
```

> [!TIP]
> To learn more about `ISO 8601 UTC` format you can acess the following link: [ISO 8601](https://documentation.sas.com/doc/en/vdmmlcdc/8.1/leforinforref/p1a0qt18rxydrkn1b0rtdfh2t8zs.htm#:~:text=UTC%20is%20a%20datetime%20value,ss%2B%7C%E2%80%93%20hh%3Amm)

---

### **FILTERED EVENTS**

This topic was created with the aim to explain better _filteredEvents_ function in case there are doubts about how this works.

- That code part filters the events array to find the events whose day of the week matches the value of the id or weekday passed in the request parameters. To do this, it creates a new Date object from the event's _dateTime_ property and then uses _getUTCDay()_ to get the index of the day of the week. Finally, it returns `eventDayOfTheWeek === req.params.idOrWeekDay`, meaning that the filtered events will only include those whose day of the week matches _req.params.idOrWeekday_.

---

### **IMPORTANT CONSIDERATION**

> [!CAUTION]
> This topic is a warning for those who wants to implement planner-api to some ongoing project. It is important to alert that some features may not work freely in some cases because of the way it was implemented in this project.

- If the list of events are empty at _events.json_ file, it is not possible to create a new event because the process of creating a fresh one needs a previous event with an id declared to generate it. At _createEvent_ the id is calculated based on `events[events.length - 1]._id + 1` so, to resolve that problem, you have to manually insert some event with any start id of your choice.

---

### **DEPLOYMENT**

- This topic is to discuss the deployment process of planner-api. The project was deployed using Vercel, a powerful platform for hosting and managing modern web applications. The live application can be accessed at the following link: [Live Planner API](https://planner-api.vercel.app/).

- The deployment process was seamless and straightforward with Vercel. All I had to do was to connect the GitHub repository to Vercel and trigger a new deployment every time changes were made to the code. The deployment process is fully automated, and there is no worry about manual updates or server maintenance.

- In addition to the ease of deployment, Vercel also provides a range of features and tools to help monitor and manage the application. With Vercel's dashboards, it is possible to monitor real-time performance, track errors, and see how users are interacting with the application.

---

### **AUTHOR**

- Giovane Iwamoto, computer science student at UFMS - Brazil, Campo Grande - MS.

  I am always open to receiving constructive criticism and suggestions for improvement in my developed code. I believe that feedback is an essential part of the learning and growth process, and I am eager to learn from others and make my code the best it can be. Whether it's a minor tweak or a major overhaul, I am willing to consider all suggestions and implement the changes that will benefit my code and its users.
