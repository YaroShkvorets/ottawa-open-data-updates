const got = require('got');
const today = new Date().toISOString().slice(0,10))
//const today = "2018-07-17"

got('http://data.ottawa.ca/api/3/action/recently_changed_packages_activity_list', { json: false }).then(response => {
  const res = JSON.parse(response.body)
  for(let obj of res.result){
    if(obj.timestamp.indexOf(today)==0){
      console.log(obj.timestamp)
    }
  }

}).catch(error => {
  console.log(error.response.body);
});
