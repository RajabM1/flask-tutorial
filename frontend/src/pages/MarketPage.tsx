import { useEffect, useState } from "react";
import TableHeader from "../components/table/TableHeader";
import TableRow from "../components/table/TableRow";
import HttpService from "../service/HttpService";
import Root from "./Root";
import ActionButton from "../components/button/ActionButton";
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate } from "react-router-dom";

interface Item {
    id: number;
    name: string;
    barcode: string;
    price: number;
    description: string;
}

const MarketPage = () => {
    const columns = ["ID", "Name", "Barcode", "Price", "Description", "Options"];
    const [items, setItems] = useState<Item[]>([]);
    const [marketError, setMarketError] = useState("");
    const [marketMessage, setMarketMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await HttpService.getRequest('item');
                setItems(response);
            } catch (error) {
                setMarketError("Error fetching items");
                console.error("Error fetching items:", error);
            }
        };
        fetchItems();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await HttpService.deleteRequest(`item/${id}`);

            setItems((items) => items.filter((item) => item.id !== id));
            setMarketMessage("Item deleted successfully")
        } catch (error) {
            setMarketError(`Error deleting item with ID ${id}:`)
            console.error(`Error deleting item with ID ${id}:`, error);
        }
    };


    return (
        <Root>
            <ErrorMessage message={marketError} type="danger" />
            <ErrorMessage message={marketMessage} type="success" />
            <table className="table table-hover table-dark">
                <TableHeader columns={columns} />
                <tbody>
                    {items.length > 0 ? (
                        items.map((item) => (
                            <TableRow
                                key={item.id}
                                values={[item.id, item.name, item.barcode, `${item.price} $`, item.description]}
                                actions={
                                    <>
                                        <ActionButton label="Purchase" color="info" />
                                        <ActionButton label="Delete" color="danger" onClick={() => handleDelete(item.id)} />
                                    </>
                                }
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length}>No items available</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <ActionButton label="Add Item" color="primary" onClick={()=>navigate('/market/add')}/>
        </Root>
    );
};


export default MarketPage;
