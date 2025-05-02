const cron = require('node-cron');
const ConnectionRequest = require('../models/connectionReq');
const {subDays, startOfDay, endOfDay} = require('date-fns');

const sendEmail = require('./sendEmail')
/**
 * first * - second
 * second * - minutes
 * third * - hour
 *  - day of match
 *  -  month
 *  -  day of week
 * 
 *  crontab guru
 *  at 08:00 
 * 
 *  ( 0 8 * * *) every second
 */

cron.schedule("0 8 * * *",async()=>{
    // Send emails to all people who got requests the previous day

    try{    

        const yesterday = subDays(new Date(), 0);

        const yesterdayStart = startOfDay(yesterday);
        const yesterdayEnd = endOfDay(yesterday);

        const pendingRequests = await ConnectionRequest.find({
            status:"interested",
            createdAt: {
                $gte: yesterdayStart,
                $lt: yesterdayEnd,
            },
        }).populate("fromUserId toUserId");


        const listOfEmails = [...new Set(pendingRequests.map((req)=> req.toUserId.emailId))]

        for(const email of listOfEmails){
            // Send Email
            try{
                const res = await sendEmail.run()
            }
            catch(err){

            }
        }
    }
    catch(err){
        console.log(err)
    }
});