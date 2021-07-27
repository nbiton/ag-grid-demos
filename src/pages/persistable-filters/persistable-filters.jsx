import React, {useCallback, useEffect, useState} from 'react';
import {AgGridReact} from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import {Button} from "@material-ui/core";
import {useAthletesRowData, useAthletesTableConfig} from "../../hooks";
import {persistToQueryParam} from "../../util";

export const PersistableFiltersPage = () => {
    const [initialFilterModel, setInitialFilterModel] = useState();
    const [gridApi, setGridApi] = useState();
    const [isAfterLoad, setIsAfterLoad] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsAfterLoad(true);
        }, 1000);
    }, []);

    const config = useAthletesTableConfig();
    const [rowData] = useAthletesRowData();

    const onGridReady = useCallback((params) => {
        setGridApi(params.api);
    }, []);

    const handleFilterChanged = () => {
        if (isAfterLoad) {
            persistToQueryParam('filter_state', JSON.stringify(gridApi.getFilterModel()));
        }
    }

    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        try {
            setInitialFilterModel(JSON.parse(urlSearchParams.get('filter_state')));
            console.log('Filter state retrieved from query string');
        } catch (e) {
            console.log('No initial filter state')
        }
    }, []);

    useEffect(() => {
        if (gridApi && initialFilterModel && isAfterLoad) {
            gridApi.setFilterModel(initialFilterModel);
        }
    }, [gridApi, initialFilterModel, rowData, isAfterLoad])

    return (
        <div>
            <h2>Persistable filters</h2>
            <p>The state of the filters is persisted and retrieved from the URL's query string</p>
            <p>Change and activate some filters, then refresh to see it in action</p>
            <p>Click "Reset Filters" below the table to deactivate all filters</p>
            <div
                id="myGrid"
                style={{height: 400, width: 1600}}
                className="ag-theme-material"
            >
                <AgGridReact
                    onFilterChanged={handleFilterChanged}
                    columnDefs={config.columnDefs}
                    defaultColDef={config.defaultColDef}
                    frameworkComponents={config.frameworkComponents}
                    rowData={rowData}
                    onGridReady={onGridReady}
                />
            </div>
            <Button variant="outlined" onClick={() => gridApi.setFilterModel(null)}>Reset Filters</Button>
        </div>
    )
}