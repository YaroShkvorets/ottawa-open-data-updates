//add your email to the array below
const sendTo = ['shkvorets+opendata@gmail.com', 'ottopendata@gmail.com']

const got = require('got');
const nodemailer = require('nodemailer');

const today = new Date().toISOString().slice(0,10)

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: "smtp.gmail.com",
  auth:{
          type: 'OAuth2',
          user:"ottopendata@gmail.com",
          clientId:"321397177067-o8la2emmaj0lk0evst6truva39ogarnv.apps.googleusercontent.com",
          clientSecret:"1UydiTqna7R1pLiCL3e85ekz",
          refreshToken:"1/0sTRLbVBsvSAyQjwtpdqNOqKDwQq3IUxTkrcXfhXYhE"
       },
  tls: {
      rejectUnauthorized: false
  }
});



function sendEmail(subj, body)
{
  var mailOptions = {
    from: 'Ottawa Open Data <ottopendata@gmail.com>',
    bcc: sendTo.join(', '),
    subject: subj,
    html: body
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
  let body = "<ul>"
  let i=0
  for(let obj of res.result){
    if(obj.timestamp.indexOf(today)==0){
      body+='<li><a href = "http://data.ottawa.ca/dataset/'+obj.data.package.name+'">'+obj.data.package.name+'</a></li>'
      i++
    }
  }
  body+='</ul>'
  if(i>0){
    subject = i + ' updated datasets on Ottawa open data portal'
    sendEmail(subject, body)
  }
  else{
    console.log('No dataset updates')
  }

}).catch(error => {
  console.log('Failed to request package activity list. Error: ', error);
});
