## Travel With	

This app is based on the idea of travel group management. Each travel has the detailed information for the travel and for the users that will be assisting. This app allows us to set tasks and see his actual state and which user completed it. Also you can see and join public travels from another users. You can recive invitations for private travels and decline or join it.

## User Stories

- **Signup:** As a anon user I can sign up as a new user.
- **Login:** As a anon user I can log in with my account.
- **Logout:** As a user I can logout from my account. 
- **List of Travels:** As a user I can see the list of all my travels or search a public travel for join in.
- **Search Travels:** As a user I can search a travel by city of destionation or by title. 
- **User profile:** As a user I can see, edit my profile and see other users profiles.
- **Create your travel:** As a owner I can create a travel. I can invite my travel partners. 
- **Create tasks:** As a user that have a travel done I can create different tasks.
- **Dashboard:** As a user I can see my travels, the state of the travel and the state of the tasks.
- **Edit my travel:** As a member only, I can edit and invite new travel partners.
- **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist



## Backlog

Admin features

- Approve or decline the newly joined user from the travel 
- Get notifications whenever there is a new task to do.

User features

- Display saved events on a calendar in the dashboard

Other features:

- Add a map on event details page and the route of the travel
- Add a chat and dm platform for user connections



# Client / Front-end

## Routes (React App)

| Path                     | Component     | Permissions | Behavior                                                 |
| ------------------------ | ------------- | ----------- | -------------------------------------------------------- |
| `/`                      | Home          | anon only   | Home page                                                |
| `/signup`                | Signup        | anon only   | Signup form, link to login                               |
| `/login`                 | Login         | anon only   | Login form, link to signup                               |
| `/logout`                | n/a           | user        | Navigate to public homepage after logout, expire session |
| `/travel`                | Travel        | user        | Show and filter public travels                           |
| `/travel/:id`            | TravelDetails | user        | Show details of a travel                                 |
| `/travel/:id/tasks`      | Tasks         | user        | Add and see tasks of the travel                          |
| `/travel/create`         | CreateTravel  | user        | Create a new travel                                      |
| `/travel/edit/:id`       | EditTravel    | user        | Edit travel form                                         |
| `/profile/:id`           | Profile       | user        | View user profile                                        |
| `/profile/:id/edit`      | EditProfile   | user        | Edit profile form                                        |
| `/profile/:id/dashboard` | Dashboard     | user        | Shows users dashboard                                    |

## Components

- AnonRoute
- Carousel
- InviteInput
- Navbar
- NotificationPanel
- SearchBar
- Tasks
- TravelCard
- TravelDetails



## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.getTravelsList()
  - auth.createTravel(travel)
  - auth.editTravel(travel)
  - auth.deleteTravel(travel)
  - auth.getProfile(id)
  - auth.editProfile(user)
  - auth.createTask(travel, taskName)
  - auth.editTask(task)
  - auth.deleteTask(task)
  - auth.createInvitation(travel, guestEmail)
  - auth.getInviteList()
  - auth.deleteInvite(invite)
  - auth.handleUpload(theFile)
  - auth.handleUploadCoverPic(theFile)
  - auth.joinTravel(travel)
  
  

# Server / Back-end

## Models

User model

```javascript
{
  {
    email: {type: String, required: true},
    password: {type: String, required: true},
    username: {type: String, required: true},
    profilePic: {
      type: String,
      default: "./images/profile-picture.png",
    },
    userFrom: {type: String, default: null},
    userBirthdate: {type: Date, default: null},
    about: {type: String, default: null},
    invitationCode: {type: String, default: null},
    pendingInvitation: [{
      type: Schema.Types.ObjectId,
      ref: 'Invite'
    }],
    ownTravels: [{type: Schema.Types.ObjectId, ref: "Travel"}],
    joinTravels: [{type: Schema.Types.ObjectId,ref: "Travel"}],
    assignTasks: [{ type: Schema.Types.ObjectId, ref: "Task" }]
    },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
}
```

Travel model

```javascript
 travelName: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    coverPic: { type: String },
    files: [{ type: String }],
    isPublic: { type: Boolean, default: false },
    owner: {type: Schema.Types.ObjectId,ref: "User"},
		tasks: [{type: Schema.Types.ObjectId,ref: "Task"}],
    travelMembers: [{type: Schema.Types.ObjectId,ref: "User"}],
    invitationList: [{type: Schema.Types.ObjectId,ref: 'Invite'}],
    messages: [{ type: Schema.Types.ObjectId, ref: "Message" }]},
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
```

Task model

```javascript
  {
    taskName: { type: String, required: true },
    taskCreator: { type: Schema.Types.ObjectId, ref: "User" },
    taskDeadline: { type: Date, default: null },
    taskNote: { type: String, default: null },
    assignTo: [{ type: Schema.Types.ObjectId, ref: "User", default: null }],
    doneTask: { type: Boolean, default: false },
    completedBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
    includesInTravel: { type: Schema.Types.ObjectId, ref: "Travel" }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
```
Invite model

```javascript
   {
    inviteBy: { type: Schema.Types.ObjectId, ref: "User" },
    guestEmail: { type: String, required: true },
    inviteTo: {type: Schema.Types.ObjectId, ref: 'Travel'},
    isPending: {type: Boolean, default: true}
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
```

<br>

## API Endpoints (back-end routes)

| HTTP Method | URL                        | Request Body                                                 |
| ----------- | -------------------------- | ------------------------------------------------------------ |
| GET         | `/auth/me`                 | Saved session                                                |
| POST        | `/auth/signup`             | {username, password, email, profilePic,userFrom, userBirthdate, about, pendingInvitation} |
| POST        | `/auth/login`              | {email, password}                                            |
| POST        | `/auth/logout`             | (empty)                                                      |
| GET         | `/`                        | (empty)                                                      |
| POST        | `/travel/create`           | {travelName, startDate, endDate, origin, destination, owner, travelMembers, isPublic, coverPic} |
| PATCH       | `/travel/edit/:id`         | {travelName, startDate, endDate, origin, destination, owner, travelMembers, isPublic, coverPic} |
| POST        | `/travel/delete/:id`       | (empty)                                                      |
| GET         | `/travel/:id`              | (empty)                                                      |
| POST        | `/travel/:id/createinvite` | {guestEmail}                                                 |
| POST        | `/travel/:id/createTask`   | {taskName, taskDeadline, assignTo}                           |
|             | `/travel`                  |                                                              |
|             | `/travel`                  |                                                              |
|             | `/travel`                  |                                                              |

<br>

## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/invite/b/h04VXbg4/59e7b33e9cf97ad86dd35ea30b7ed298/ironhack-project-3) or picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/caprosset/alumni-network_client)
[Server repository Link](https://github.com/caprosset/alumni-network_server)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)
