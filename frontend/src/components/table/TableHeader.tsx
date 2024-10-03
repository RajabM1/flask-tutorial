interface Props {
    columns: string[];
}

const TableHeader = ({ columns }: Props) => {
    return (
        <thead>
            <tr>
                {columns.map((column, index) => (
                    <th key={index} scope="col">
                        {column}
                    </th>
                ))}
            </tr>
        </thead>
    )
}

export default TableHeader