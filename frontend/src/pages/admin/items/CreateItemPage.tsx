import SubmitButton from "../../../components/shared/buttons/SubmitButton";
import FormInput from "../../../components/shared/form/FormInput";
import Message from "../../../components/shared/feedback/Message";
import { useCreateItemForm } from "../../../hooks/items/useCreateItemForm";
import { useTranslation } from "react-i18next";
import FileUpload from "../../../components/shared/form/FileUpload";
import FormSelector from "../../../components/shared/form/FormSelector";
import Container from "@mui/material/Container";
import { Box } from "@mui/material";
import NavBar from "../../../components/admin/layout/navbar/NavBar";

const CreateItemPage = () => {
    const { t } = useTranslation("create-item");
    const {
        formData,
        formError,
        handleInputChange,
        handleCreateItem,
        handleFileChange,
        handleCategoryChange,
        pageMessage,
        categories,
    } = useCreateItemForm();
    return (
        <>
            <NavBar />
            <Container
                maxWidth="sm"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Message
                    message={pageMessage.message}
                    type={pageMessage.type}
                />
                <form className="form-signin" onSubmit={handleCreateItem}>
                    <FormInput
                        id="name"
                        type="text"
                        label={t("labels.name")}
                        value={formData.name}
                        onChange={handleInputChange}
                        error={formError.name}
                    />
                    <FormInput
                        id="price"
                        type="number"
                        label={t("labels.price")}
                        value={formData.price}
                        onChange={handleInputChange}
                        error={formError.price}
                    />
                    <FormInput
                        id="barcode"
                        type="text"
                        label={t("labels.barcode")}
                        value={formData.barcode ?? ""}
                        onChange={handleInputChange}
                        error={formError.barcode}
                    />
                    <FormInput
                        id="description"
                        type="text"
                        label={t("labels.description")}
                        value={formData.description ?? ""}
                        onChange={handleInputChange}
                        error={formError.description}
                    />

                    <FileUpload
                        id="image"
                        label={t("labels.image")}
                        onChange={handleFileChange}
                        error={formError.image}
                        accept="image/*"
                    />

                    <FormInput
                        id="quantity"
                        type="number"
                        label={t("labels.quantity")}
                        value={formData.quantity ?? ""}
                        onChange={handleInputChange}
                        error={formError.quantity}
                    />

                    <FormSelector
                        data={categories}
                        label={t("labels.category")}
                        id={"selector"}
                        onChange={handleCategoryChange}
                        error={formError.category}
                    />
                    <Box sx={{ mt: 3 }}>
                        <SubmitButton label={t("labels.save")} color="black" />
                    </Box>
                </form>
            </Container>
        </>
    );
};

export default CreateItemPage;
