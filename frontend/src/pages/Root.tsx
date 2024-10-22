import { ReactNode } from "react";
import NavBar from "../components/layout/navbar/NavBar";
import Footer from "../components/layout/Footer";

interface Props {
  children: ReactNode;
}

const Root = ({ children }: Props) => {
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <NavBar />
        <div className="flex-grow-1 px-2 px-md-4 py-2 py-md-3">{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default Root;
