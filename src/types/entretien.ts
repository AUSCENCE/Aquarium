export interface Entretien {
    id?: string;
    clientId: string;
    EntretienDu: Date;
    description: string;
    dateExecution: Date;    
    createdAt?: Date;
}