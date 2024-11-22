import { useEffect, useState } from "react";
import HttpService from "../../service/HttpService";
import { UserAddress } from "../../types/userAddress";

export const useOrderConfirmation = (addressId: string) => {
    const [addressData, setAddressData] = useState<UserAddress | null>(null);
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

    return { addressData, isLoading };
};
