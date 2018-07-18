const got = require('got');
const nodemailer = require('nodemailer');

//const today = new Date().toISOString().slice(0,10)
const today = "2018-07-17"


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ottopendata@gmail.com',
    pass: 'opendata'
  }
});



function sendEmail(body)
{
  var mailOptions = {
    from: 'ottopendata@gmail.com',
    to: 'shkvorets@gmail.com',
    subject: 'New Ottawa Open Data update',
    text: body
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

got('http://data.ottawa.ca/api/3/action/recently_changed_packages_activity_list', { json: false }).then(response => {
  const res = JSON.parse(response.body)
  let body = 'Found new objects: \n'
  for(let obj of res.result){
    if(obj.timestamp.indexOf(today)==0){
      body+=obj.timestamp+'\n'

    }
  }
  sendEmail(body)

}).catch(error => {
  console.log(error.response.body);
});
