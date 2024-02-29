
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const url = require('url');
const port = process.env.PORT || 3000

const app = express();
   
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use('/proxy/*', (req, res, next) => {
    let targetUrl = decodeURIComponent(req.originalUrl.slice(7)); // Remove '/proxy/' from the original URL
    let { protocol, host, pathname, search } = url.parse(targetUrl);
    console.log('target');
    console.log(targetUrl);
    
    createProxyMiddleware({
        target: protocol + '//' + host,
        changeOrigin: true,
        pathRewrite: (path, req) => {
            // console.log('path');
            // console.log(pathname + search || '');
          
            // return pathname + search || '';
            console.log('path');
            console.log(pathname + (search || '') || '');
          
            return pathname + (search || '') || '';
        },
        onProxyRes: function (proxyRes, req, res) {
            proxyRes.headers['Access-Control-Allow-Origin'] = '*';
        }
    })(req, res, next);
});



app.listen(port, () => {
    console.log('socket is up on port ' + port)
})