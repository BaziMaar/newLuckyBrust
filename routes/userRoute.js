const express = require("express");
const user_route = express.Router();
const bodyParser = require("body-parser");
const request = require('request');
const user_controller = require('../controllers/userController');
const { verifyDeviceId } = require('../middlewares/verifyDeviceId');

user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({ extended: true }));

user_route.post('/login', user_controller.userLogin);
user_route.post('/update', verifyDeviceId, user_controller.updateProfile);
user_route.get('/getUser', user_controller.getUser);
user_route.get('/getUpi', user_controller.getUpi);
user_route.post('/postUpi', user_controller.postUpi);
user_route.post('/removeUpi', user_controller.deleteUpi);
user_route.post('/App', user_controller.updateApp);
user_route.get('/getVersion', user_controller.getVersion);

user_route.get('/sms', (req, res) => {
    const phone = req.query.phone;
    const otp = req.query.otp;
    
    if (!phone || !otp) {
        return res.status(400).send({ error: 'Phone number and OTP are required' });
    }

    const url = `https://cloud.smsindiahub.in/vendorsms/pushsms.aspx?APIKey=Y7nKtcEfLkWgdaal1Yub3A&msisdn=${phone}&sid=AREPLY&msg=Your One Time Password is ${otp}. Thanks SMSINDIAHUB&fl=0&gwid=2`;
    
    request(url, (error, response, body) => {
        if (error) {
            return res.status(500).send({ error: 'Failed to send SMS' });
        }

        if (response.statusCode === 200) {
            res.send(body);
        } else {
            res.status(response.statusCode).send(body);
        }
    });
});

module.exports = user_route;

