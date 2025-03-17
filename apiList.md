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
- POST /request/send/:status/:userId  -- status - interested and ignore
// - POST /request/send/ignored/:userId

- POST /request/review/:status/:requestId  --> accepted or rejected
// - POST /request/review/rejected/:requestId

# userRouter
- GET /user/connections
- GET /user/requests/received

- GET /user/feed - Gets you the profile of other users on platform


Status: ignore, interested, accepted, rejected

# WE DONT TRUST THE REQ.BODY (means attackers milciouse data will send)
# ALWAYS THINK ABOUT CORNER CASES
