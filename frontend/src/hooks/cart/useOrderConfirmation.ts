import { useEffect, useState } from "react";
import HttpService from "../../service/HttpService";
import { UserAddress } from "../../types/userAddress";
import { Item } from "../../types/item";

export const useOrderConfirmation = (addressId: string, orderCode: string) => {
    const [addressData, setAddressData] = useState<UserAddress | null>(null);
    const [orderData, setOrderData] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAddressData = async () => {
            if (!addressId) return;

            try {
                const response = await HttpService.getRequest(
                    `users/address/${addressId}`
                );
                setAddressData(response.address);
            } catch (error) {
                console.error("Error fetching address data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAddressData();
    }, [addressId]);

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const response = await HttpService.getRequest(
                    `order/${orderCode}`
                );
                setOrderData(response);
            } catch (error) {
                console.error("Error fetching address data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrderData();
    }, [orderCode]);

    return { addressData, isLoading, orderData };
};
