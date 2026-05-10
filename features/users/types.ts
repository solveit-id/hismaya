export type UserRole = "ADMIN" | "USER";

export interface UserFormState {
    success?: boolean;
    message?: string;
    error?: {
        name?: string[];
        email?: string[];
        phone?: string[];
        password?: string[];
        role?: string[];
    };
}