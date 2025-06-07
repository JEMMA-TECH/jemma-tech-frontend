export type Order = {
    $id: string;
    id: string;
    order_date: string;
    status: string;
    company_id: string;
    customer_id: string;
    created_at: string;
    updated_at: string;
}

export type OrderItem = {
    $id: string;
    id: string;
    order_id: string;
    item_id: string;
    company_id: string;
    quantity: number;
    created_at: string;
    updated_at: string;
}