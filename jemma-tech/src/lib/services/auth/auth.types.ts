

export interface IloginResponse {
    access_token: string;
    refresh_token: string;
}
export type IloginRequest = {
    email: string;
    password: string;
}

export type IRegisterRequest = {
    name: string,
    address: string,
    company_email: string,
    phone: string,
    first_name: string,
    last_name: string,
    email: string,
    contact: string,
    password: string
}
