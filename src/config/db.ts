import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI as string)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log("DB connection failed...")
        console.log(error)
        process.exit(1)
    }
}

export default connectDb