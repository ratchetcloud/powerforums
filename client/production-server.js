const express = require('express');

const app = express();
const port = process.env.PORT || 4000;

app.use(express.static('dist'));
app.use((req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
});

app.listen(port, function () {
    console.log('Server running on port ' + port);
});