import { ReactNode } from "react";
import NavBar from "../../components/new/layout/navbar/NavBar";
import Footer from "../../components/new/layout/Footer";
import Box from "@mui/material/Box";

interface Props {
  children: ReactNode;
}

const Root = ({ children }: Props) => {
  return (
    <>
      <NavBar />
      <Box>{children}</Box>
      <Footer />
    </>
  );
};

export default Root;
