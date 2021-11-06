export type item = {
    itemId: string;
    amount: number;
    observation: string;
};

export class CreateOrderDTO {
    tableId: string;
    customer: string;
    items: item[];
}
