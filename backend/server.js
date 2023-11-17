require("dotenv").config()
const database = require("./database/db");
const express = require("express");
const cors = require("cors");
const port = process.env.PORT;

database.connectDB();

const app = express();
app.use(cors())
app.use(express.json())
app.use("/api/student/auth", require("./routes/student/auth"))
app.use("/api/student/activities", require("./routes/student/activities"))
<<<<<<< HEAD
=======
app.use('/api/student/undertakingForm',require('./routes/student/undertakingForm'))
app.use('/api/student/marks',require('./routes/student/marks'))
>>>>>>> 477c8daaf9684f6d453f46bc52de659c2f83917a

app.listen(port, () => {
    console.log(`Connected Server http://localhost:${port}`);
})