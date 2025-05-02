export type Service = {
    $id: string;
    id: string;
    name: string;
    company_id: string;
    created_at: string;
    updated_at: string;
}

export type Item = {
    $id: string;
    id: string;
    name: string;
    price: number;
    service_id: string;
    company_id: string;
    created_at: string;
    updated_at: string;
}