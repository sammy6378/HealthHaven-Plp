import "dotenv/config";
import { verify } from "hono/jwt"
import { Context, Next } from "hono";

// Authentication configuration
export const verifyToken = async (token: string, secret: string) => {
    try {
        const decoded = await verify(token as string, secret)
        return decoded;
    } catch (error: any) {
        return null
    }
}


// authorization configuration
const authMiddleware = async (c: Context, next: Next, requiredRole: string) => {
    const authHeader = c.req.header("Authorization");
    
    if (!authHeader) {
        return c.json({ error: "Token not provided" }, 401);
    }


    // Extract the token from the "Bearer <token>" format
    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

    if (!token) {
        return c.json({ error: "Malformed token" }, 400);
    }


    const decoded = await verifyToken(token, process.env.JWT_SECRET as string);
    


    if (!decoded) {
        return c.json({ error: "Invalid token" }, 401);
    }

    if (requiredRole === "both") {
        if (decoded.role !== "admin" && decoded.role !== "user") {
            return c.json({ error: "Unauthorized" }, 401);
        }
        return next();
    }

    if (decoded.role !== requiredRole) {
        return c.json({ error: "Unauthorized" }, 401);
    }

    // Add decoded user details to state
    c.set("user", decoded);
    return next();
};



export const adminRoleAuth = async (c: Context, next: Next) => await authMiddleware(c, next, "admin")
export const userRoleAuth = async (c: Context, next: Next) => await authMiddleware(c, next, "user")
export const bothAuth = async (c: Context, next: Next) => await authMiddleware(c, next, "both")