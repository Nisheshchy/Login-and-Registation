import bcrypt from "bcryptjs";
import { z } from "zod";

// Password hashing
export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};

// Input validation schemas
export const signupSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(50),
    email: z.string().email("Invalid email address"),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
});

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required")
});

// Mock Token handling (improvement over plain random strings)
export const generateToken = (user) => {
    const payload = {
        id: btoa(user.email),
        role: user.email === "admin@log.com" ? "admin" : "user",
        exp: Date.now() + 3600000 // 1 hour expiration
    };
    return btoa(JSON.stringify(payload));
};

export const verifyToken = (token) => {
    try {
        const payload = JSON.parse(atob(token));
        if (Date.now() > payload.exp) return null;
        return payload;
    } catch (e) {
        return null;
    }
};

// XSS Prevention (Basic sanitization)
export const sanitize = (str) => {
    if (typeof str !== "string") return str;
    return str.replace(/[&<>"']/g, (m) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[m]));
};
