import axios from 'axios';
import qs from 'qs';

for(var i = 0; i < 10000; i++){
var data = qs.stringify({
  'Name': 'Nume2' + i 
});
var config = {
  method: 'post',
  url: 'http://localhost:8080/api/contacts',
  headers: { 
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
}

