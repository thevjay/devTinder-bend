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


- 
- Create a free cluster
- Install mongoose library
- connect Your application o the database URL\
- 

- Create a UserSchema & user Model

- bcrypt 
- Vijayyy@323 , salt is random things rounds

- Read about ref and populate https
- Create GET /

# socket.io Backend Part
- # Step1 :
- - npm i socket.io


# HW
- Homework: Fix bug - If i'm not friend, then I should not be able to send message
- Homework: feat: Show Green Symbol when Online??? - (last Seen 2 hours ago)
- HomeWork: feat: Limit messages when fetching from DB
- Project Ideas:- Tic tac too game
- Project Idea 2:-  Chess

# SES - Simple Email Service
- Create a IAM user 
- Give Access to AmazonSESFullAccess
- Amazon SES: Create an Identity
- Verify your domain name
- Verify an email address identity
- Install AWS SDK - v3 
- Code Example https://github.com/awsdocs
- https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/javascriptv3/example_code/ses/src/ses_sendemail.js

- Setup SesClient
- Access Creadentials should be created in IAM under SecurityCreadentials Tab
- Add the creadentials to the env file 
- Write code for SESClient
- Write Code for sending email address
- Make the email dynamic by passing more params to the run function

- npm i @aws-sdk/client-ses

- Create Access Key in SES user in  Set description tag - optinal
- .env file
    - AWS_SES_ACCESS_KEY = "bjgygjhvjvhjh"
    - AWS_SES_SECRET_KEY = 'yj0Fsimbkuhjfgdsdfsdfgsdf'

# AWS SES node js documentation
- Sending Email Using Amazon SES


# Scheduling cron jobs in NodeJS Cron jobs:
    - Installing  node-cron
    - Learning abouy cron expressions syntax - creatab.guru
    - Schedule a job
    - date-fns
    - Find all the unique email ID who have get connection Request in previous day
    -send email
    - Explore queue mechanim to send bulk emails
    - Amazon SES Bulk Emails
    -  Make sendemial function dynamic
    - bee-queue & bull npm pakages queue mechanisms
- In Node.js, cron jobs are scheduled tasks that run automatically at specified intervals. The most common way to implement them in a Node.js app is by using the node-cron package.
- npm install node-cron

- date-fns
    - it will - today day and yesterday
    - npm install date-fns

    - BEE - QUEUE:
    Bee-Queue is used to queue and process jobs (like sending emails, image processing, etc.) in the background, especially in scalable systems. It is:
    Built for fast performance

Easy to use

Ideal for systems needing high throughput

Backed by Redis (so you'll need Redis running)

# 1. Producer (adds job to the queue):
 -  import Queue from 'bee-queue';

const emailQueue = new Queue('email');

emailQueue.createJob({ to: 'user@example.com', subject: 'Hello!' }).save();

# 2 2. Consumer / Worker (processes the job):
    - import Queue from 'bee-queue';

const emailQueue = new Queue('email');

emailQueue.process(async (job) => {
  console.log(`Sending email to ${job.data.to}`);
  // logic to send email here
});


    - BULL 
