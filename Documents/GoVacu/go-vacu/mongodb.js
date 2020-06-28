// sudo mongod --dbpath /Users/martin_galli13hotmail.com/mongodb-data
// sudo lsof -i -n -P | grep TCP
// sudo lsof -i :8000 Buscar port por numero
// sudo kill -9 PID

const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'go-vacu';

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!');
    }
    const db = client.db(databaseName);

    /* INSERT ONE DOCUMENT */
    db.collection('users').insertOne({
        _id: id,
        name: 'Maria Catalina Casserly',
        age: 27,
    }, (error, result) => {
        if (error) {
            return console.log('Unable to insert User');
        }
        console.log(result.ops);
    });

    /* INSERT MANY DOCUMENTS */
    db.collection('users').insertMany([
        {nombre: 'Carlos', apellido: 'Tevez', direccion: 'Av. Reclus 2300', edad: 36},
        {nombre: 'Lionel', apellido: 'Messi', direccion: 'Barcelona', edad: 32},
    ], (error, result) => {
        if (error) {
            return console.log('Unable to insert Users!');
        }
        console.log(result.ops, result.insertedCount);
    });

    /* FIND ONE */
    db.collection('users').findOne({nombre: 'Martin'}, (error, user) => {
        if (error) {
            return console.log('Unable to fetch!');
        }
        console.log(`Found ${user.nombre}!`);
    });

    /* FIND MANY */
    db.collection('users').find({ edad: 36 }).toArray((error, users) => {
        if (error) {
            console.log('Unable to fetch!');
        }
        if (users.length > 1) {
            return users.map(user => console.log(`Found ${user.nombre}!`));
        }
        console.log(`Found ${users[0].nombre}`);
    });

    db.collection('users').updateOne({
        _id: new ObjectID("5ebc394321760fa5eaf2cbbd"),
    }, {
        $set: {
            nombre: 'Maria Catalina',
            edad: 27,
        }
    }).then((result) => console.log(result)).catch((error) => console.log(error));

    db.collection('users').deleteMany({ edad: 27 })
        .then((result) => console.log(result))
        .catch((error) => console.log(error));
});
