const BreezeConnect = require('breezeconnect').BreezeConnect;


const appkey = "F32pB8389)3U42%34u$644456P40O072";
const appSecret = "8z6241tp4+B089x_620Z1&25)0u10W88";
var axios = require('axios');

var config = {
    method: 'get',
    url: 'https://breezeapi.icicidirect.com/api/v2/historicalcharts?stock_code=NIFTY&exch_code=NFO&from_date=2022-11-10T00:00:00.000Z&to_date=2022-11-11T00:00:00.000Z&interval=1day&product_type=Options&expiry_date=2022-11-24T00:00:00.000Z&right=Call&strike_price=18000',
    headers: { 
        'X-SessionToken': 'insert your sesion token from customer detail API call', 
        'apikey': appkey
    }
};

axios(config)
.then(function (response) {
    console.log(JSON.stringify(response.data));
})
.catch(function (error) {
    console.log(error);
});
