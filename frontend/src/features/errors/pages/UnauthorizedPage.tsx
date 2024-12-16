import { useTranslation } from "react-i18next";
import ErrorLayout from "../components/ErrorLayout";

const UnauthorizedPage = () => {
    const { t } = useTranslation("errors-page");

    return (
        <ErrorLayout
            title={t("unauthorized.title")}
            description={t("unauthorized.description")}
            buttonLabel={t("go_back_btn")}
        />
    );
};

export default UnauthorizedPage;
