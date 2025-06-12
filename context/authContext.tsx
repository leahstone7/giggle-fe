


type AuthContextType = {
    user: string | null;
    login: (token: string) => Promise<void>;
    logout: ()=> Promise<void>
}