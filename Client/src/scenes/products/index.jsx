import React, {useEffect, useState} from "react";
import { useTheme, Grid } from "@mui/material";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {useDispatch, useSelector} from "react-redux";
import {Outlet, useNavigate} from "react-router-dom";

import { useGetCatalogsQuery } from "state/api";

const Products = () =>{
    const { data=[], error, isLoading, isFetching, isError } = useGetCatalogsQuery();
    const theme = useTheme();
    const navigate = useNavigate();

    const renderTree = (nodes) => (
        <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
            {Array.isArray(nodes.child)
                ? nodes.child.map((node) => renderTree(node))
                : null}
        </TreeItem>
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return
        (<div>
            <div>{error.status}</div>
            <div>{error.error}</div>
        </div>);
    }

    return(
        <Grid
            className={isFetching ? 'posts--disabled' : ''}
            container spacing={2}
              sx={{
                  "& .scrollbar-thumb": {
                      backgroundColor: "green",
                  },
        }}>
            <Grid item xs={3}>
                <TreeView
                    aria-label="rich object"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    defaultExpanded={['root']}
                    sx={{ height: 900, flexGrow: 1, minWidth:50, maxWidth: 300, overflowY: 'auto' }}
                    onNodeSelect={(event, nodeId) => navigate(`group/${nodeId}`)}
                >
                    {data.map(item=>{
                        return renderTree(item)
                    })}
                </TreeView>
            </Grid>
            <Grid item xs={9}
                  sx={{
                      "& .MuiDataGrid-root": {
                          border: "none",
                      },
                      "& .MuiDataGrid-cell": {
                          borderBottom: "none",
                          whiteSpace: "pre-wrap"
                      },
                      "& .MuiDataGrid-columnHeaders": {
                          backgroundColor: theme.palette.background.alt,
                          color: theme.palette.secondary[100],
                          borderBottom: "none",
                      },
                      // "& .MuiDataGrid-virtualScroller": {
                      //     backgroundColor: theme.palette.primary.light,
                      // },
                      "& .MuiDataGrid-footerContainer": {
                          backgroundColor: theme.palette.background.alt,
                          color: theme.palette.secondary[100],
                          borderTop: "none",
                      },
                      "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                          color: `${theme.palette.secondary[200]} !important`,
                      },
                  }}>
                <Outlet/>
            </Grid>
        </Grid>
    )
};

export default Products;