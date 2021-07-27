import React from 'react';
import {AgGridReact} from "ag-grid-react";
import {useAthletesRowData, useAthletesTableConfig} from "../../hooks";

export const PinnedColumnPage = () => {
    const config = useAthletesTableConfig(config => {
        config.columnDefs[0].pinned = 'left';
        return config;
    });

    const [rowData] = useAthletesRowData();
    return (
        <div>
            <h2>Pinned Column</h2>
            <p>The "Athlete" column is configured to be pinned to the left, so it doesn't get scrolled out of view</p>
            <div
                id="myGrid"
                style={{height: 400, width: '50%'}}
                className="ag-theme-material"
            >
                <AgGridReact
                    columnDefs={config.columnDefs}
                    defaultColDef={config.defaultColDef}
                    frameworkComponents={config.frameworkComponents}
                    rowData={rowData}
                />
            </div>
        </div>
    )
}