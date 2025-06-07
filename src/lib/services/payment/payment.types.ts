export type Payment = {
    $id: string;
    id: string;
    customer_id: string;
    order_id: string;
    amount: number;
    payment_type: string;
    payment_status: string;
    payment_date: string;
    company_id: string;
    created_at: string;
    updated_at: string;
}