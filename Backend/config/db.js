import mongoose from "mongoose"
//async functions return a promise, which is code that can take some time to return something
//other code may then wait for this promise, as it needs the input or data
export const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1); //1 means there was an exit with failure, 0 means success.
    }
}