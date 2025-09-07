
export interface User{
    id?: number;       // json-server auto-generates id
    username: string;
    email:string;
    password: string;
    role: 'Admin' | 'User';
    reason: string;       
    expiry: boolean;      
    duration: number;     
}