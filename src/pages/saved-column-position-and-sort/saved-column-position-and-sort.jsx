import React, {useCallback, useEffect, useState} from 'react';
import {useAthletesRowData, useAthletesTableConfig} from '../../hooks';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import {AgGridReact} from 'ag-grid-react';
import {persistToQueryParam} from '../../util';

export const SavedColumnPositionAndSortPage = () => {
    const config = useAthletesTableConfig()
    const [rowData] = useAthletesRowData();
    const [columnApi, setColumnApi] = useState();
    const [isAfterLoad, setIsAfterLoad] = useState();
    const [initialColumnState, setInitialColumnState] = useState();

    useEffect(() => {
        setTimeout(() => {
            setIsAfterLoad(true);
        }, 0);

        const urlSearchParams = new URLSearchParams(window.location.search);
        try {
            setInitialColumnState(JSON.parse(atob(decodeURIComponent(urlSearchParams.get('column_state')))));
        } catch (e) {}
    }, []);

    const onGridReady = useCallback((params) => {
        setColumnApi(params.columnApi);
    }, []);

    const handleColumnChange = useCallback(() => {
        if (columnApi && isAfterLoad) {
            const columnState = columnApi.getColumnState();
            const stateString = btoa(JSON.stringify(columnState));
            persistToQueryParam('column_state', stateString);
        }
    }, [columnApi, isAfterLoad]);

    useEffect(() => {
        if (initialColumnState && isAfterLoad && columnApi) {
            columnApi.applyColumnState({ state: initialColumnState, applyOrder: true })
        }
    }, [initialColumnState, isAfterLoad, columnApi]);
    return (
        <div>
            <h2>Saved column position and sort</h2>
            <p>Resize and reposition the columns or change sort and then refresh to see the state persisted</p>
            <h5>Note: the column state data is stored in the URL as base64 since it's a long JSON and it can be made more compact this way</h5>
            <div
                id='myGrid'
                style={{height: 400, width: 1600}}
                className='ag-theme-material'
            >
                <AgGridReact
                    onColumnMoved={handleColumnChange}
                    onColumnResized={handleColumnChange}
                    onSortChanged={handleColumnChange}
                    columnDefs={config.columnDefs}
                    defaultColDef={config.defaultColDef}
                    frameworkComponents={config.frameworkComponents}
                    rowData={rowData}
                    onGridReady={onGridReady}
                />
            </div>
        </div>
    )
}
