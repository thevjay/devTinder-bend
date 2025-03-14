 app.get -> This will only handle GET call to/test 
 app.use -> this will match all the http method API calls  to /test



- Multiple Route Handlers - Play with  the code
- next()
- next function and errors along with res.send()
- app.use('/route',rH,[rH2,rH3],rH4,rH5);

- What is a Middleware? Why do we need it?
- How express JS basically handles requests behind the scenes
- Difference Between app.use() vs app.all();
- Write a dummy auth middleware for admin
- Write a dummy auth middleware for all user routes,  except /user/login
- Error Handlng and wild card error handling