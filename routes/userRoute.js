const express = require("express");
const user_route = express.Router(); // Use express.Router() to create a router instance
const bodyParser = require("body-parser");
const user_controller = require('../controllers/userController');
const {verifyDeviceId} = require('../middlewares/verifyDeviceId');
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({ extended: true }));

user_route.post('/login', user_controller.userLogin);
user_route.post('/update',verifyDeviceId,user_controller.updateProfile)
user_route.get('/getUser',user_controller.getUser)
user_route.get('/getUpi',user_controller.getUpi)
user_route.post('/postUpi',user_controller.postUpi)
user_route.post('/removeUpi',user_controller.deleteUpi)
user_route.post('/App',user_controller.updateApp)
user_route.get('/getVersion',user_controller.getVersion)
user_route.get('/sms', (req, res) => {
    const url = `https://cloud.smsindiahub.in/vendorsms/pushsms.aspx?APIKey=Y7nKtcEfLkWgdaal1Yub3A&msisdn=9699466887&sid=AREPLY&msg=Your%20One%20Time%20Password%20is%20383169.%20Thanks%20SMSINDIAHUB&fl=0&gwid=2http://cloud.smsindiahub.in/vendorsms/pushsms.aspx?APIKey=Y7nKtcEfLkWgdaal1Yub3A&msisdn=${req.query.phone}&sid=AREPLY&msg=Your One Time Password is ${req.query.otp}. Thanks SMSINDIAHUB&fl=0&gwid=2`;
    request(url, (error, response, body) => {
        if (response.statusCode == 200) {
            res.send(body);
        } else {
            res.status(response.statusCode).send(error);
        }
    });
});
module.exports = user_route;
