import { Box } from "@mui/material";

const ImageSection = ({
    imageUrl,
    name,
}: {
    imageUrl: string;
    name: string;
}) => {
    return (
        <Box width={{ xs: "100%", sm: "75%", md: "500px" }} height="400px">
            <img
                src={imageUrl}
                alt={`${name} image`}
                style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                }}
            />
        </Box>
    );
};

export default ImageSection;
