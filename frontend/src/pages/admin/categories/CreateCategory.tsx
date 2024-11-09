import { useTranslation } from "react-i18next";
import FileUpload from "../../../components/shared/form/FileUpload";
import FormInput from "../../../components/shared/form/FormInput";
import NavBar from "../../../components/admin/layout/navbar/NavBar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import SubmitButton from "../../../components/shared/buttons/SubmitButton";
import { useCreateCategoryPage } from "../../../hooks/category/useCreateCategoryPage";

const CreateCategory = () => {
    const { t } = useTranslation("create-category");
    const {
        formData,
        formError,
        handleInputChange,
        handleFileChange,
        handleCreateCategory,
    } = useCreateCategoryPage();
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
                <form className="form-signin" onSubmit={handleCreateCategory}>
                    <FormInput
                        id="name"
                        type="text"
                        label={t("labels.name")}
                        value={formData.name}
                        onChange={handleInputChange}
                        error={formError.name}
                    />

                    <FileUpload
                        id="image"
                        label={t("labels.image")}
                        onChange={handleFileChange}
                        error={formError.image}
                        accept="image/*"
                    />
                    <Box sx={{ mt: 3 }}>
                        <SubmitButton label={t("labels.save")} color="black" />
                    </Box>
                </form>
            </Container>
        </>
    );
};

export default CreateCategory;
