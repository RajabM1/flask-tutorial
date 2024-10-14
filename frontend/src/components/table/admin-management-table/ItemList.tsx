import TableHeader from "../TableHeader";
import TableRow from "../TableRow";

interface Props {
    columns: string[];
    data: Array<{
        id: number;
        values: (string | number)[];
        actions?: React.ReactNode;
    }>;
    noDataMessage: string;
}

const ItemList = ({ columns, data, noDataMessage }: Props) => {
    return (
        <div className="table-responsive">
            <table className="table table-hover table-dark">
                <TableHeader columns={columns} />
                <tbody>
                    {data.length > 0 ? (
                        data.map((item) => (
                            <TableRow
                                key={item.id}
                                values={item.values}
                                actions={item.actions}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length}>{noDataMessage}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ItemList;
