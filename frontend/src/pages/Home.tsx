import Root from "./Root";
import { useTranslation } from "react-i18next";

const Home = () => {
    const {t}=useTranslation('home-page')
    return (
        <Root>
            <div>{t('welcome')}</div>
        </Root>
    );
};

export default Home;
