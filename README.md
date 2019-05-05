# Plugger

Client can be found here: https://users.metropolia.fi/~ottojaa/dist/ 

## Users can:
* Register and login
* Post plugs
* Accept other user's plugs and add to their collection
* Delete and edit their data
* View saved plugs
* View plugs posted by self
* Search for plugs
## Technologies used:
* Javascript
* Node.js
* Express.js
* MongoDB
* Axios.js
* Vue
* Vuetify
# Api requests
### User 
* '/authenticate' - GET - Authenticates the user
* '/logout' - GET - Logs the current user out
* '/user - GET - Gets the current uses's data
* '/user/:id' - POST - Edit user's profile info
* '/register' - POST - Registers the user
* '/user/create' - POST - create user
### Plug
* '/plug/:id' - POST - Update a plug
* '/gallery/:id' - Delete - Deletes a specific plug
* '/search/:searchterm - GET - Do a search based on titles and details of plugs
* '/gallery/:id' - GET - Find a specific plug
* '/savedPlugs/' - GET - Gets all plugs saved by user
* '/gallery/:id' - POST - Updates plug data (useable only by owner)
* '/' - POST - Uploads a plug
* '/gallery/' - GET - Gets all plugs

## Folder structure

### Client
Client folder is purely for the Vue client, and it works separately from the express api (and they can, and are deployed separately).
Clientside requests are made with axios, and these requests can be found in https://github.com/ottojaa/Plugger/blob/master/client/src/PlugService.js

### Api

* In the **main directory**, index.js contains all of the middleware and mongodb configuration required for the api to function, and the api is defined to use two different route files, one for the plugs, and the other for the users themselves.

* **Routes-folder** contains the aforementioned two routes. These route folders define what happens when requests are made, but they cannot function without **controllers** that specify what these routes do, these routes are listed further below.
  
  1. **router.js** contains all of the necessary routes for the plugs, such as upload, delete and update functions, as well as search.
  2. **user.js** contains all of the necessary routes for user authentication, registration, logout, and getting the user information.

* **Controllers** folder contains two controller files, that contain the actual functionality that the routes depend on.

  1. **postController.js** has all of the functions used for the plugs, i.e searching, updating, deleting, uploading and so on.
  2. **userController.js** has all of the functions used for the users, i.e authentication, finding users, registration and session deleting.

* **Models** folder contains schemas that tell the program how and what kind of data should be stored in mongoDB. These schemas can be used to perform mongoDB-functions such as Find(). 

  1. **plug.js** has all of the necessary fields that should be stored, and also includes functions that store text indexes that can be used to search these plugs by their title or description.
  2. **user.js** has all of the fields and data structure that are required.
  
Hence, the file/folder structure in the order of dependency: **index.js > routes > controllers > models** 
