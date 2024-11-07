import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid2";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Avatar, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

const Footer = () => {
    const { t } = useTranslation("footer");
    return (
        <Box
            component="footer"
            sx={{
                py: 4,
                color: "inherit",
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <Typography variant="h6" color="inherit" gutterBottom>
                            {t("about")}
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <Link href="#" color="inherit" underline="hover">
                                {t("about_links.blog")}
                            </Link>
                            <Link href="#" color="inherit" underline="hover">
                                {t("about_links.meet_the_team")}
                            </Link>
                            <Link href="#" color="inherit" underline="hover">
                                {t("about_links.contact_us")}
                            </Link>
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 4 }}>
                        <Typography variant="h6" color="inherit" gutterBottom>
                            {t("support")}
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <Link href="#" color="inherit" underline="hover">
                                {t("support_links.shipping")}
                            </Link>
                            <Link href="#" color="inherit" underline="hover">
                                {t("support_links.return")}
                            </Link>
                            <Link href="#" color="inherit" underline="hover">
                                {t("support_links.faq")}
                            </Link>
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 4 }}>
                        <Typography variant="h6" color="inherit" gutterBottom>
                            {t("socialMedia")}
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1 }}>
                            <Link
                                href="https://www.facebook.com/"
                                color="inherit"
                                target="_blank"
                            >
                                <Avatar>
                                    <Facebook />
                                </Avatar>
                            </Link>
                            <Link
                                href="https://www.instagram.com/"
                                color="inherit"
                                target="_blank"
                            >
                                <Avatar>
                                    <Instagram />
                                </Avatar>
                            </Link>
                            <Link
                                href="https://www.twitter.com/"
                                color="inherit"
                                target="_blank"
                            >
                                <Avatar>
                                    <Twitter />
                                </Avatar>
                            </Link>
                        </Box>
                    </Grid>
                </Grid>

                <Box mt={5} textAlign="center">
                    <Typography variant="body2" color="inherit" sx={{ mb: 2 }}>
                        {t("copyright")}
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                        <Link href="#" color="inherit" underline="hover">
                            {t("terms_of_service")}
                        </Link>
                        <Link href="#" color="inherit" underline="hover">
                            {t("privacy_policy")}
                        </Link>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
