import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async (retries = 5, delay = 5000) => {
    for (let i = 0; i < retries; i++) {
        try {
            const conn = await mongoose.connect(process.env.MONGO_DB, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });

            console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
            return; // Exit function if successful
        } catch (error) {
            console.error(`❌ MongoDB Connection Error: ${error.message}`);
            console.log(`🔄 Retrying in ${delay / 1000} seconds... (${i + 1}/${retries})`);

            if (i === retries - 1) process.exit(1); // Exit on last attempt
            await new Promise((res) => setTimeout(res, delay)); // Wait before retrying
        }
    }
};