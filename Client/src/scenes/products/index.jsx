import React, {useEffect, useState} from "react";
import { useTheme, Grid } from "@mui/material";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {useDispatch, useSelector} from "react-redux";
import {Outlet, useNavigate} from "react-router-dom";

import {decreaseCount, increaseCount, setCatalog, setItems} from "state";

const Products = () =>{
    const theme = useTheme();
    const [selected, setSelected] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [filterModel, setFilterModel] = useState({
        items: [
        ],
    });

    const catalog = useSelector((state)=>state.catalog);
    const items = useSelector((state)=>state.items);
    const token = useSelector((state)=>state.token);

    const getCatalog = async () => {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}client/catalog`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        dispatch(setCatalog(data));
        await getProducts();
    };

    const getProducts = async () => {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}client/products`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        dispatch(setItems(data));
    };

    const renderTree = (nodes) => (
        <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
            {Array.isArray(nodes.child)
                ? nodes.child.map((node) => renderTree(node))
                : null}
        </TreeItem>
    );

    useEffect(() => {
        getCatalog();
    }, []);

    return(
        <Grid container spacing={2}
              sx={{
                  "& .scrollbar-thumb": {
                      backgroundColor: "green",
                  },
        }}>
            <Grid item xs={3}>
                <TreeView
                    aria-label="rich object"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpanded={['root']}
                    defaultExpandIcon={<ChevronRightIcon />}
                    sx={{ height: 900, flexGrow: 1, minWidth:50, maxWidth: 300, overflowY: 'auto' }}
                    selected={selected}
                    onNodeSelect={(event, nodeId) => navigate(`group/${nodeId}`)}
                >
                    {catalog? catalog.map(item=>{
                        return renderTree(item)
                    }) : <>Loading...</> }
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