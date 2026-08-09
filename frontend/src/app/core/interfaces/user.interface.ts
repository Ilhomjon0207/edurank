import  {UserRole} from '../enums'
export interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    createdAt: string;
    refreshToken: string | null;
}
