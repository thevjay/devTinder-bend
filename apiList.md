# Tinder API's

# authRouter
- POST /signup
- POST /login
- POST /logout

# profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password     ->H?W  Forget Password API 

# connectionRequestRouter
- POST /request/send/interestd/:userId
- POST /request/send/ignored/:userId

- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

# userRouter
- GET /user/connections
- GET /user/requests/received

- GET /user/feed - Gets you the profile of other users on platform


Status: ignore, interested, accepted, rejected

