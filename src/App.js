import React from 'react';

import {CustomRenderersPage} from "./pages/custom-renderers/custom-renderers";
import { BrowserRouter, Link, Route, Switch, useRouteMatch } from "react-router-dom";
import {CustomFilterPage} from "./pages/custom-filter/custom-filter";
import {RowSelectionPage} from "./pages/row-selection/row-selection";
import {PersistableFiltersPage} from "./pages/persistable-filters/persistable-filters";
import {PinnedColumnPage} from "./pages/pinned-column/pinned-column";
import {SavedColumnPositionAndSortPage} from "./pages/saved-column-position-and-sort/saved-column-position-and-sort";
import {DraggableRowsPage} from "./pages/draggable-rows/draggable-rows";
import styled from "styled-components";
import {List, ListItem, ListItemText} from "@material-ui/core";

const StyledFlex = styled.div`
    display: flex;
    flex: 1;
    width: 100vw;
    overflow: no-content;
`

const StyledTitle = styled.h1`
  background: #444;
  margin: 0;
  padding: 0.5em 1em;
  color: #efefef;
`

const SideNavContainer = styled.div`
    width: 250px;
    background: #212121;
    color: white;
    & .Mui-selected {
      color: deepskyblue;
      font-weight: bold;
    }
`

const PageContainer = styled.div`
  flex: 1;
  padding: 1rem;
`

const ListItemLink = ({ children, ...moarProps}) => {
    const match = useRouteMatch(moarProps.to);
    return (
        <ListItem button component={Link} {...moarProps} selected={!!match}>
            <ListItemText>
                {children}
            </ListItemText>
        </ListItem>
    )
}
const App = () => {
    return (
        <BrowserRouter>
            <StyledTitle>Ag-Grid demos for the Editor List</StyledTitle>
            <StyledFlex>
                <SideNavContainer>
                    <List component='nav'>
                        <ListItemLink to='/custom-renderers'>
                            Custom cell renderers
                        </ListItemLink>
                        <ListItemLink to='/custom-filters'>
                            Custom filters
                        </ListItemLink>
                        <ListItemLink to='/row-selection'>
                            Row selection
                        </ListItemLink>
                        <ListItemLink to='/pinned-column'>
                            Pinned column
                        </ListItemLink>
                        <ListItemLink to='/persistable-filters'>
                            Persistable filters
                        </ListItemLink>
                        <ListItemLink to='/saved-columns'>
                            Saved columns state
                        </ListItemLink>
                        <ListItemLink to='/draggable-rows'>
                            Draggable/sortable rows
                        </ListItemLink>
                    </List>
                </SideNavContainer>
                <PageContainer>
                    <Switch>
                        <Route path="/custom-renderers">
                            <CustomRenderersPage />
                        </Route>
                        <Route path="/custom-filters">
                            <CustomFilterPage />
                        </Route>
                        <Route path="/row-selection">
                            <RowSelectionPage />
                        </Route>
                        <Route path="/pinned-column">
                            <PinnedColumnPage />
                        </Route>
                        <Route path="/persistable-filters">
                            <PersistableFiltersPage />
                        </Route>
                        <Route path="/saved-columns">
                            <SavedColumnPositionAndSortPage />
                        </Route>
                        <Route path="/draggable-rows">
                            <DraggableRowsPage />
                        </Route>
                    </Switch>
                </PageContainer>
            </StyledFlex>
        </BrowserRouter>
    );
};


export default App;
