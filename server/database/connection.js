//conexion a la bse de datos
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // mongodb connection string
        /* const con = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
 */
        const con = await mongoose.connect(process.env.MONGO_URI).then(() => console.log("Conected to atlas web"))
        //console.log(`MongoDB connected : ${con.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}
/* mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Conected to atlas web"))
    .catch((error) => console.error(error));
 */

module.exports = connectDB