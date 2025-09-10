
export interface User{

    id?: number|string;       // json-server auto-generates id
    username: string;
    authentication: string;
    email:string;
    password: string;
    role: string;
    reason: string;       
    expiry: boolean;      
    duration: number;     
}