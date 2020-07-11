const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const http = require('http');

app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.post('/data', (req, res, next)=>{
    console.log(req.body);   
    let token = req.body.token;    
    var options = {
      'method': 'POST',
      'url': 'https://api.test.paysafe.com/cardpayments/v1/accounts/1001749320/auths',
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': 'Basic dGVzdF92ZW5rYXRwYXZhbjpCLXFhMi0wLTVmMDZhNWQzLTAtMzAyZDAyMTQ3NTdmZmU0YWUxNzRiNWY3MDhhM2EzZWI0YWRhYWI3M2VkYWU1YWVmMDIxNTAwOGQ3MzNhNzI3NjQ3ZTQ1NmY5ZGJlYmJmOWJlOGE3MzE3ZWY5MDMxNQ==',
        'Cookie': 'WLSESSIONID=7N0-A60PHYVVmJs0GpqII59La3PirC_HG6_4ykj1hgEX16UiHRNT!1990333645!-2003708200'
      },
      body: JSON.stringify({"merchantRefNum":"payment-token-demo-1","amount":1500,"settleWithAuth":true,"card":{"paymentToken": token},"billingDetails":{"street":"100 Queen Street West","city":"Toronto","state":"ON","country":"CA","zip":"M5H 2N2"}})
    
    };
    request(options, function (error, response) {
      if (error) {
        res.send(JSON.stringify(error));
      }      
      res.send(JSON.stringify(response.body));
    });
});
app.use((req, res, next)=>{res.render('./index.html')});


app.listen(8080);