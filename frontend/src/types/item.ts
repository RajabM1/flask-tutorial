export type Item = {
    id?: number;
    name: string;
    barcode?: string;
    price: number;
    description?: string;
    image?: string;
    quantity?: number;
    discount?: number;
    category?: number | string;
};

export type ItemFormError = {
    name?: string;
    price?: string;
    barcode?: string;
    description?: string;
    image?: string;
    quantity?: string;
    discount?: string;
    category?: string;
};
