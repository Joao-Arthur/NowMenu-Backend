export class CreateUserDTO {
    cnpj: string;
    name: string;
    telephone: string;
    cep: string;
    address: string;
    district: string;
    city: string;
    state: string;
    email: string;
    password: string;
}

export class LoginUserDTO {
    email: string;
    password: string;
}

export class UpdateUserDTO {
    cnpj: string;
    name: string;
    telephone: string;
    cep: string;
    address: string;
    district: string;
    city: string;
    state: string;
    email: string;
    password: string;
}
