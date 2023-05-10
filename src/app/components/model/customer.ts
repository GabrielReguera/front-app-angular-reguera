export interface Customer {
    id?: number,
    firstName: string,
    lastName: string,
    cpf: string,
    birthDate: string,
    dateCreate?: string,
    monthlyIncome: number,
    status: boolean,
    email: string,
    password: string
}