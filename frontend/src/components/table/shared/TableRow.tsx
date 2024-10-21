import { ReactNode } from "react";

interface Props {
    values: (string | number | React.ReactNode)[];
    actions?: ReactNode;
}

const TableRow = ({ values, actions }: Props) => {
    return (
        <tr>
            {values.map((value, index) => (
                <td
                    key={index}
                    style={{
                        maxWidth: "150px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    {value}
                </td>
            ))}
            <td>{actions}</td>
        </tr>
    );
};

export default TableRow;
