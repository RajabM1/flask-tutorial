export type Category = {
    id: number;
    name: string;
    image: string;
};

export type CategoryFormError = {
    name?: string;
    image?: string;
};
