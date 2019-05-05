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

