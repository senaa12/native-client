import {
    Done,
    Push,
    SendMailPayload
} from 'common-native-client';

import nodeMailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

const logger = require('../logger');
const settings = require('../settings/index');

const sendMail = async (sendMailData: SendMailPayload, push: Push, done: Done) => {
    await settings.initializeSettings()

    const mailSettings = settings.getMailSettings();
    let transporter = nodeMailer.createTransport({
        host: mailSettings.smtp,
        port: mailSettings.port,
        secure: true,
        auth: {
            user: mailSettings.username,
            pass: mailSettings.password
        }
    });

    let mailOptions: Mail.Options = {
        from: `"Chrome Extension" ${mailSettings.username}`,
        to: sendMailData.to, // list of receivers
        subject: sendMailData.subject, // Subject line
        html: sendMailData.html // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            logger.log('FAILED: Mail did not sent', JSON.stringify(error));
        } else {
            logger.log('Mail Sent', JSON.stringify(info));
        }
    });

    done();
}

module.exports = sendMail;