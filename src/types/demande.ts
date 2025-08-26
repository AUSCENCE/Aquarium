export interface Demande {
    id?: string;
    clientId: string;
    description: string;
    dateExecution: Date;
    executed?: boolean;
    montant?: number;
    createdAt?: Date;
}
