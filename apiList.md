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
- GET /user/requests/received

- GET /user/connections

- GET /user/feed - Gets you the profile of other users on platform


Status: ignore, interested, accepted, rejected

# WE DONT TRUST THE REQ.BODY (means attackers milciouse data will send)
# ALWAYS THINK ABOUT CORNER CASES


# /feed?page=1&limit=10 => first 10 users 1 - 10    => .skip(0) & .limit(10)

# /feed?page=2&limit=10 => 11 - 20   => => .skip(10) & .limit(10)

# /feed?page=3&limit=10 => 21 - 30  => .skip(20) & .limit(10)

- .skip(0)  &  .limit(10)

-Skip = (page-1)*limit

