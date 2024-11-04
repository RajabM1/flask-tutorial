import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid2";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Avatar, Box } from "@mui/material";

const Footer = () => {
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
                            About
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <Link href="#" color="inherit" underline="hover">
                                Blog
                            </Link>
                            <Link href="#" color="inherit" underline="hover">
                                Meet The Team
                            </Link>
                            <Link href="#" color="inherit" underline="hover">
                                Contact Us
                            </Link>
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 4 }}>
                        <Typography variant="h6" color="inherit" gutterBottom>
                            Support
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <Link href="#" color="inherit" underline="hover">
                                Shipping
                            </Link>
                            <Link href="#" color="inherit" underline="hover">
                                Return
                            </Link>
                            <Link href="#" color="inherit" underline="hover">
                                FAQ
                            </Link>
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 4 }}>
                        <Typography variant="h6" color="inherit" gutterBottom>
                            Social Media
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
                        © 2024 NULL
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                        <Link href="#" color="inherit" underline="hover">
                            Terms of Service
                        </Link>
                        <Link href="#" color="inherit" underline="hover">
                            Privacy Policy
                        </Link>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;