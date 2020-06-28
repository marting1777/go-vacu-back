const express = require('express');
require('./db/mongoose');

const userRouter = require('./routers/user');
const vacunaRouter = require('./routers/vacuna');
const turnoRouter = require('./routers/turno');

const app = express();
const port = process.env.PORT || 9000;

const User = require('./models/User');

// RUTA DE MANTENIMIENTO
// app.use((req, res, next) => {
//     res.status(503).send("GO Vacu está en mantenimiento! Enseguida estaremos de vuelta!");
// });

app.use(express.json());
app.use(userRouter);
app.use(vacunaRouter);
app.use(turnoRouter);

app.listen(port, () => console.log(`Server is un on port ${port}`));