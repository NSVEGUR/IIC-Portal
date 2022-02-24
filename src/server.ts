import mongoose from 'mongoose';
import app from './app';
import config from './config';


//Connecting to MongoDB
const db = config.DBURL.replace('<PASSWORD>', config.DBPASSWORD);


mongoose.connect(db).then(con => {
	console.log('Connected to MongoDB Successfully');
}).catch(err => {
	console.log(err.message ?? 'Unknown Error in DB Connection');
})


const port = config.PORT || 8000;


//Listening to the server
app.listen(port, () => {
	console.log(`IITDM IIC's server started successfully at port: ${port}`);
});
