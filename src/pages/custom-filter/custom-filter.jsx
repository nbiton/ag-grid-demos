import React, {forwardRef, useState, useImperativeHandle, useEffect} from "react";
import {AgGridReact} from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import {useAthletesRowData, useAthletesTableConfig} from "../../hooks";

const CustomFilter = forwardRef((props, ref) => {
    const [year, setYear] = useState('All');

    // expose AG Grid Filter Lifecycle callbacks
    useImperativeHandle(ref, () => {
        return {
            doesFilterPass(params) {
                return params.data.year >= 2010;
            },

            isFilterActive() {
                return year === '2010'
            },

            // this example isn't using getModel() and setModel(),
            // so safe to just leave these empty. don't do this in your code!!!
            getModel() {
            },

            setModel() {
            }
        }
    });

    const onYearChange = event => {
        setYear(event.target.value)
    }

    const { filterChangedCallback } = props;
    useEffect(() => {
        filterChangedCallback();
    }, [year, filterChangedCallback]);

    return (
        <div style={{display: "inline-block", width: "400px"}} onChange={onYearChange}>
            <div style={{padding: "10px", backgroundColor: "#d3d3d3", textAlign: "center"}}>This is a very wide filter</div>
            <label style={{margin: "10px", padding: "50px", display: "inline-block", backgroundColor: "#999999"}}>
                <input type="radio" name="year" value="All" checked={year === 'All'}/> All
            </label>
            <label style={{margin: "10px", padding: "50px", display: "inline-block", backgroundColor: "#999999"}}>
                <input type="radio" name="year" value="2010"/> Since 2010
            </label>
        </div>
    )
});

export const CustomFilterPage = () => {
    const config = useAthletesTableConfig(config => {
        config.frameworkComponents.customFilter = CustomFilter;
        config.columnDefs[3].filter = 'customFilter';
        return config;
    });
    const [rowData] = useAthletesRowData();

    return (
        <div>
            <h2>Custom filters</h2>
            <p>Filters can be switched, customized or turned off. Some columns are using different types of the built in filters</p>
            <p>The "Athlete" column has its filter turned off, and the year column is using a custom filter which contains a custom React component</p>
            <div
                id="myGrid"
                style={{height: 400, width: '100%'}}
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
    );
};