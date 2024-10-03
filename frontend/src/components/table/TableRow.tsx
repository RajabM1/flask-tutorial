import { ReactNode } from "react";

interface Props {
    values: (string | number)[];
    actions?: ReactNode
}

const TableRow = ({ values, actions }: Props) => {
    return (
        <tr>
            {values.map((value, index) => (
                <td key={index}>{value}</td>
            ))}
            <td>{actions}</td>
        </tr>
    )
}

export default TableRow