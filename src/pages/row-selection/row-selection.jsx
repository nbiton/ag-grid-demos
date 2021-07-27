import React from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import {useAthletesRowData, useAthletesTableConfig} from '../../hooks';

export const RowSelectionPage = () => {
    const config = useAthletesTableConfig(config => {
        config.columnDefs[0].checkboxSelection = true;
        return config;
    });
    const [rowData] = useAthletesRowData();
    return (
        <div>
            <h2>Row selection</h2>
            <p>AG-Grid has different built in options to customize row selection</p>
            <p>In this example, clicking on each row activates single select, but using the checkboxes on the left, holding down SHIFT or COMMAND/CTRL, multi-selection is possible</p>
            <div
                id='myGrid'
                style={{height: 400, width: 1400}}
                className='ag-theme-material'
            >
                <AgGridReact
                    rowSelection='multiple'
                    columnDefs={config.columnDefs}
                    defaultColDef={config.defaultColDef}
                    frameworkComponents={config.frameworkComponents}
                    rowData={rowData}
                />
            </div>
        </div>
    )
};