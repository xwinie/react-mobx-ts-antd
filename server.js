let express = require('express'),
    app = express(),
    path = require('path'),
    port = process.env.PORT ? process.env.PORT : 9001,
    dist = path.join(__dirname, 'dist'),
    bodyParser = require('body-parser'),
    proxy = require('http-proxy-middleware'),
    hmacSHA256 = require('crypto-js/hmac-sha256'),
    CryptoJS = require('crypto-js'),
    moment = require('moment');

app.use(express.static(dist));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


let url = "http://127.0.0.1:1323",
    webContext = "",
    ACCESS_KEY = 'app1',
    ACCESS_SECRET = 'Lx1b8JoZoE',
    timestamp = moment().format('YYYY-MM-DD HH:mm:ss');

let options = {
    target: url,
    changeOrigin: true,
    ws: true,
    pathRewrite: {
        '^/api': '' // Host path & target path conversion
    },
    proxyTimeout: 1000,
    onProxyReq: function (proxyReq, req, res) {
        console.log("Request incoming, redirecting to: " + url + req.url);

        let resource = webContext + req.url;
        let body = req.body;
        let signBody;
        let contentType = req.headers['content-type'];
        if (contentType == 'text/plain') {
            signBody = body;
        } else {

            signBody = JSON.stringify(body);
            if (signBody === '{}') {
                signBody = ""
            }
        }
        console.log("signature: " + req.method + "\n" + signBody + "\n" + resource + "\n" + timestamp + "\n");
        let signature = hmacSHA256(req.method + "\n" + signBody + "\n" + resource + "\n" + timestamp + "\n", ACCESS_SECRET);

        // Write out body changes to the proxyReq stream
        proxyReq.setHeader("appid", ACCESS_KEY);
        proxyReq.setHeader("timestamp", timestamp);
        proxyReq.setHeader("signature", CryptoJS.enc.Base64.stringify(signature));
        proxyReq.setHeader('Content-Length', Buffer.byteLength(signBody));
        proxyReq.write(signBody);
        proxyReq.end();
    }
};
let proxyServer = proxy(options);
app.all('/api/*', proxyServer);

// app.get('/', function (req, res) {
//     res.sendFile(path.join(dist, 'index.html'));
//
// });

app.listen(port, function (error) {

    if (error) {
        console.log(error); // eslint-disable-line no-console
    }

    console.info('Express is listening on port %s.', port); // eslint-disable-line no-console

});

