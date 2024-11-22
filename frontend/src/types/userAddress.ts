export type UserAddress = {
    id: number;
    userId: number;
    name: string;
    phone: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
    createdAt: string;
    updatedAt: string;
};
