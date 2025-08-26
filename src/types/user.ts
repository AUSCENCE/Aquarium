export interface User {
    id?: string;
    name: string;
    phone: string;
    role:
    | "admin"
    | "user"
    | "technician";
    createdAt?: Date;
};