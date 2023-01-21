const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const UseController = require('./controllers/userController');
const CourseController = require('./controllers/courseController');
const RoomController = require('./controllers/roomController');
const StudentContoller = require('./controllers/StudentContoller');
const Siri = require('./controllers/Siri');


dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = process.env.PORT || 8089;
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (error) => {
    if (error) {
        console.log('Database Error: ', error.message);
    }
});
app.use(express.static('./public'))

mongoose.connection.once('open', () => {
    console.log('Database Connection Sucessfull');
});

app.use('/user', UseController());
app.use('/rooms', RoomController());
app.use('/course', CourseController());
app.use('/student', StudentContoller());

app.use('/siri', Siri());



app.listen(PORT, () => {
    console.log(`Server is up and running on PORT ${PORT}`);
});