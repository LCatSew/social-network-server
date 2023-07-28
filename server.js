const express = require('express');
// We import the ObjectId class from mongodb
const { MongoClient, ObjectId } = require('mongodb');
let db = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = 3001;

const connectionStringURI = `mongodb://127.0.0.1:27017`;
const client = new MongoClient(connectionStringURI);



const dbName = 'socialDB';

// client.connect()
//     .then(() => {
//         console.log('Connected successfully to MongoDB');
//         // db = client.db(dbName);

//         app.listen(PORT, () => {
//         console.log(`Example app listening at http://localhost:${PORT}`);
//         });
//     })
//     .catch((err) => {
//         console.error('Mongo connection error: ', err.message);
//     });
// app.use(express.urlencoded({ extended: true }));

// app.use(express.json());

// app.post('/create', (req, res) => {
//     db.collection('socialMediaCollection').insertOne(
//         {
//             username: req.body.username,
//             email: req.body.email,
//             thoughts: [],
//             friends: [],
//         },
//     )
//         .then(results => res.json(results))
//         .catch((err) => {
//             console.error(err);
//             res.status(500).json(err);
//         });
// });

// app.get('/read', (req, res) => {
//     db.collection('socialMediaCollection').find().toArray()
//         .then(results => res.json(results))
//         .catch((err) => {
//             console.error(err);
//             res.status(500).json(err);
//         });
// });

// app.put('/update/:id', (req, res) => {
//     db.collection('socialMediaCollection').updateOne(
//         {
//             _id: ObjectId(req.params.id),
//         },
//         {
//             $set: {
//                 username: req.body.username,
//                 email: req.body.email,
//             },
//         },
//     )
//         .then(results => res.json(results))
//         .catch((err) => {
//             console.error(err);
//             res.status(500).json(err);
//         });
// });

// app.delete('/delete/:id', (req, res) => {
//     db.collection('socialMediaCollection').deleteOne(
//         {
//             _id: ObjectId(req.params.id),
//         },
//     )
//         .then(results => res.json(results))
//         .catch((err) => {
//             console.error(err);
//             res.status(500).json(err);
//         });
// });

app.use(routes);
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});   