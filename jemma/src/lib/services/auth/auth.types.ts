
export interface IRegisterResponse {
    company: {
      id: string;
      created_at: string; 
      updated_at: string; 
      name: string;
      address: string;
      company_email: string;
      phone: string;
    };
    admin_employee: {
      id: string;
      first_name: string;
      last_name: string;
      contact: string;
      email: string;
      role: string;
          company: string;
    }
  };

export interface ILoginResponse {
    access_token: string;
    refresh_token: string;
    user: {
      id: string;
      first_name: string;
      last_name: string;
      contact: string;
      email: string;
      role: string;
      company: string;
    }
  };

export type ILoginRequest = {
    email: string;
    password: string;
};

export type IRegisterRequest = {
    first_name: string;
    last_name: string;
    email: string;
    name: string;
    phone: string;
    password: string;
    company_email: string;
    address: string;
    contact: string;
};
