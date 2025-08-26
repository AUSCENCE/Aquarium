export interface Client {
    id?: string;
    name: string;
    phone: string;
    prochaineEntretient?: Date;
    periodEntretient?: number;
    
    createdAt?: Date;
};