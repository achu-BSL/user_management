export interface RegisterFormData {
    username: string;
    email: string;
    password: string;
    confrimPassword: string;
}

export interface LoginFormData {
    email: string;
    password: string;
}


export interface ProfileFormData {
    email: string;
    username: string;
}