import React from "react";

interface DataTableProps {
    data: any[]; // Type des données d'employé
    columns: { title: string; data: string }[]; // Type des colonnes
}

const DataTable: React.FC<DataTableProps> = ({ data, columns }) => {
    // Logique de rendu du tableau de données
    return (
        <table>
            <thead>
                <tr>
                    {columns.map((column, index) => (
                        <th key={index}>{column.title}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((column, columnIndex) => (
                            <td key={columnIndex}>{row[column.data]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default DataTable;