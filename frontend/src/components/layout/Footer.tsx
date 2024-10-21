import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation('root');
  return (
    <footer className="text-white text-center py-3 mt-auto" style={{background: "#40B6A9"}}>
      <div className="container">
        <span>&copy; {t('footer.copyright')}</span>
      </div>
    </footer>
  );
};

export default Footer;
