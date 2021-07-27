import React from 'react';
import {AgGridReact} from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import {useAthletesRowData, useAthletesTableConfig} from "../../hooks";

export const DraggableRowsPage = () => {
    const config = useAthletesTableConfig(config => {
        config.columnDefs[0].rowDrag = true;
        // config.columnDefs[0].rowDragManaged = true;
        return config;
    });
    const [rowData] = useAthletesRowData();

    return (
        <div>
            <h2>Draggable/sortable rows</h2>
            <p>Rows can be dragged and sorted manually by clicking on the handle to the right, as long as no sorts or filters are active</p>
            <div
                id='myGrid'
                style={{height: 400, width: 1600}}
                className='ag-theme-material'
            >
                <AgGridReact
                    rowDragManaged
                    columnDefs={config.columnDefs}
                    defaultColDef={config.defaultColDef}
                    frameworkComponents={config.frameworkComponents}
                    rowData={rowData}
                />
            </div>
        </div>
    )
}