export default interface UserDTO {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    weight?: string;
}