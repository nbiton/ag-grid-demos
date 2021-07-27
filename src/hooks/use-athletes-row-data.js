import {useEffect, useState} from 'react';

export const useAthletesRowData = () => {
    const [rowData, setRowData] = useState();

    useEffect(() => {
        fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
            .then((resp) => resp.json())
            .then((data) => setRowData(data));
    }, []);

    return [rowData, setRowData];
}