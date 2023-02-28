const express = require('express');
const bodyParser = require('body-parser');
const shortid = require('shortid');

const app = express();
app.use(bodyParser.json());

const urls = [];

app.post('/shorten', (req, res) => {
    const { url } = req.body;
    const shortURL = shortid.generate();
    urls.push({shortURL, url});
    res.json({shortURL: `http://localhost:5000/${shortURL}`});
});

app.get('/:shortURL', (req, res) => {
    const shortURL = req.params.shortURL;
    const urlObj = urls.find(url => url.shortURL === shortURL);
    if(!urlObj){
        res.status(404).send('Not Found')
        return;
    }
    res.redirect(urlObj.url);
})

app.listen(5000, () => {
    console.log('Server started on port 5000');
})