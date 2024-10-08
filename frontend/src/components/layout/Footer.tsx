import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation('root');
  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      <div className="container">
        <span>&copy; {t('footer.copyright')}</span>
      </div>
    </footer>
  );
};

export default Footer;
