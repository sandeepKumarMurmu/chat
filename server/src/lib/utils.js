import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (userId, res) => {
    try {
        // Ensure required environment variables are set
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is missing in environment variables");
        }

        // Generate JWT Token
        const token = jsonwebtoken.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION || "7d", // Configurable expiry
        });

        // Cookie options
        const cookieOptions = {
            maxAge: Number(process.env.JWT_COOKIE_EXPIRATION) || 7 * 24 * 60 * 60 * 1000, // Default 7 days
            httpOnly: true, // Prevents JavaScript access
            sameSite: "strict", // Prevents CSRF attacks
            secure: process.env.ENVIRONMENT !== "DEV", // Secure only in production
        };

        // Set JWT in Cookie
        res.cookie("jwt", token, cookieOptions);

        return token;
    } catch (error) {
        // console.error("Error generating JWT:", error);
        throw new Error("Token generation failed");
    }
};
