import React, {useCallback, useState, useMemo} from 'react';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import styled from 'styled-components';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import {Menu, MenuItem} from "@material-ui/core";

const shapes = ['circle', 'square', 'triangle'];

const OptionsButton = styled.button`
  background: transparent;
  border: 1px solid #ddd;
  border-radius: 5px;
  &:hover {
    border: none;
    background: rgba(0,0,0,0.2);
  }
`

const ShapeCellRenderer = props => {
    const cellValue = props.valueFormatted ? props.valueFormatted : props.value;
    return (
        <svg width='20' height='20' viewBox='0 0 20 20'>
            {{
                circle: (
                    <circle cx={10} cy={10} r={10} fill='#F00' />
                ),
                square: (
                    <rect width={20} height={20} fill='#0F0' />
                ),
                triangle: (
                    <path d='M0,20 L10,4 L20,20' fill='#00F' />
                )
            }[cellValue]}
        </svg>
    );
};

const ButtonCellRenderer = props => {
    const cellValue = props.valueFormatted ? props.valueFormatted : props.value;
    const [anchorEl, setAnchorEl] = useState();
    const handleBtnClick = useCallback(evt => {
        setAnchorEl(evt.currentTarget);
    }, []);
    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);
    const handleSwitchShape = useCallback(() => {
        const ind = shapes.indexOf(cellValue)
        const nextInd = ind < shapes.length - 1 ? ind + 1 : 0;
        props.context.changeShape(props.rowIndex, shapes[nextInd]);
        // eslint-disable-next-line
    }, [cellValue])
    const handleIncPrice = useCallback(() => {
        props.context.incPrice(props.rowIndex);
        // eslint-disable-next-line
    },[]);
    return (
        <>
            <OptionsButton onClick={handleBtnClick}>...</OptionsButton>
            <Menu open={Boolean(anchorEl)} keepMounted anchorEl={anchorEl} onClose={handleClose}>
                <MenuItem onClick={handleSwitchShape}>Switch Shape</MenuItem>
                <MenuItem onClick={handleIncPrice}>Inc Price</MenuItem>
            </Menu>
        </>
    );
};

const initialData = [
    {make: "Toyota", model: "Celica", price: 35000, shape: shapes[0]},
    {make: "Ford", model: "Mondeo", price: 32000, shape: shapes[1]},
    {make: "Porsche", model: "Boxter", price: 72000, shape: shapes[2]}
];

export const CustomRenderersPage = () => {
    const [data, setData] = useState(initialData);
    const context = useMemo(() => ({
        changeShape (dataInd, shape) {
            const newData = [...data];
            newData[dataInd] = { ...newData[dataInd], shape}
            setData(newData);
        },
        incPrice (dataInd) {
            const newData = [...data];
            newData[dataInd] = { ...newData[dataInd], price: newData[dataInd].price + 1000 };
            setData(newData);
        }
    }), [data]);
    return (
        <div>
            <h2>Custom renderers and popover actions menu</h2>
            <p>The rows contain a "shape" text field. There is a custom rendered column to draw an svg that matches each shape.</p>
            <p>A second custom rendered column is used to draw a button which opens an overlay menu using Material-UI to show options that mutate the table data</p>
            <div className="ag-theme-material" style={{height: 400, width: 1280}}>
                <AgGridReact
                    rowData={data}
                    context={context}
                    frameworkComponents={{
                        shapeCellRenderer: ShapeCellRenderer,
                        buttonCellRenderer: ButtonCellRenderer
                    }}>
                    <AgGridColumn field="make" sortable={true} filter={true} />
                    <AgGridColumn field="model" sortable={true} filter={true} />
                    <AgGridColumn field="price" sortable={true} filter={true} />
                    <AgGridColumn field="shape" sortable={true} filter={true} headerName="Shape (text)" />
                    <AgGridColumn field="shape" sortable={true} filter={true} cellRenderer='shapeCellRenderer' />
                    <AgGridColumn field="shape" headerName="" cellRenderer='buttonCellRenderer' />
                </AgGridReact>
            </div>
        </div>
    );
};
