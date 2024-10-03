import { useState } from "react"
import SubmitButton from "../components/button/SubmitButton"
import ErrorMessage from "../components/ErrorMessage"
import FormInput from "../components/FormInput"
import Root from "./Root"
import HttpService from "../service/HttpService"
import { useNavigate } from "react-router-dom"

const CreateItem = () => {
    const [createItemError, setCreateItemError] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [barcode, setBarcode] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    
    const handleCreate = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        setCreateItemError("");

        try {
            await HttpService.postRequest("item", { name, price, barcode, description });
            navigate("/market");
        } catch {
            setCreateItemError("Error while creating item");
        }
    };

    return (
        <Root>
            <form className="form-signin" onSubmit={handleCreate}>
                <ErrorMessage message={createItemError} type="danger" />
                <FormInput
                    id="name"
                    type="text"
                    label="Item Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <FormInput
                    id="price"
                    type="number"
                    label="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <FormInput
                    id="barcode"
                    type="text"
                    label="Barcode"
                    value={barcode}
                    onChange={(e) => setBarcode(e.target.value)}
                    required
                />

                <FormInput
                    id="description"
                    type="text"
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <SubmitButton label="Save" color="primary" />
            </form>
        </Root>
    )
}

export default CreateItem