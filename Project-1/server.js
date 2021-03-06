const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(bodyParser.json({ extended: true }));
app.use(express.static('.'));

app.get('/catalogData', (req, res) => {
  fs.readFile('catalogData.json', 'utf8', (err, data) => {
    res.send(data);
  });
});

app.post('/addToCart', (req, res) => {
  fs.readFile('catalogCart.json', 'utf8', (err, data) => {
    if (err) {
      res.send('{"result": 0}');
    } else {
      const cart = JSON.parse(data);
      const item = req.body;

      cart.push(item);

      fs.writeFile('catalogCart.json', JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
        }
      });
    }
  });
});

app.post('/updateToCart', (req, res) => {
  fs.readFile('catalogCart.json', 'utf-8', (err, data) => {
    if(err) {
      res.send('{"result": 0}');
    }
    const cart = req.body;
    fs.writeFileSync('catalogCart.json', JSON.stringify(cart), (err) => {
      if(err) {
        res.send('{"result": 0}');
      } else {
        res.send('{"result": 1}');
      }
    });
  });
});

app.listen(3000, function() {
  console.log('server is running on port 3000!');
});