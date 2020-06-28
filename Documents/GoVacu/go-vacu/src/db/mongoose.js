const mongoose = require('mongoose');

const connectionURL = 'mongodb://127.0.0.1:27017/';
const databaseName = 'go-vacu-api';
const connectionBase = connectionURL + databaseName;

mongoose.connect(connectionBase, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
});
