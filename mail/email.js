var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'yandex',
    auth: {
        user: 'faizuralmas@yandex.com',
        pass: 'eight0almas'
    }
});

var mailto = (to, content) =>{
    var mailOptions = {
        from: 'faizuralmas@yandex.com',
        to: to,
        subject: 'Activation',
        html: '<table cellpadding="0" cellspacing="0" border="0" style="min-width: 600px;">' +
        '<tbody>' +
        '<tr style="background: #f4d742; border: none">' +
        '<th style="border: none"><h1>Welcome</h1></th>' +
        '</tr>' +
        '<tr style="background: #484949; color:#f4d742; height:120px">' +
        '<td valign="top"><p style="margin: 15px; text-align:center">Your Activation Code is : '+content+'</td>' +
        '</tr>' +
        '</tbody>' +
        '</table>'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}

module.exports = {
    mailTo: mailto
}