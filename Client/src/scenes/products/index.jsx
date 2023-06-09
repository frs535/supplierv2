import React, {useEffect, useState} from "react";
import {
    Box,
    Card,
    CardActions,
    CardContent,
    Collapse,
    Button,
    Typography,
    Rating,
    useTheme,
    useMediaQuery, Grid,
} from "@mui/material";
import Header from "components/Header";
import { useGetProductsQuery, useGetCatalogsQuery } from "state/api";
import HierarchyTreeView from "../../components/HierarchyTreeView";
import {DataGrid, GridLogicOperator} from "@mui/x-data-grid";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {useSelector} from "react-redux";

const columns = [
    {
        field: "article",
        headerName: "Артикул",
        headerAlign: "left",
        align: "left",
        flex: 0.25
    },
    {
        field: "name",
        headerName: "Товар",
        headerAlign: "left",
        align: "left",
        flex: 1.5
    },
    {
        field: "unit",
        headerName: "Упак",
        headerAlign: "left",
        align: "left",
        flex: 0.2
    },
    {
        field: "quantity",
        headerName: "Кол.",
        type: 'number',
        headerAlign: "left",
        align: "left",
        flex: 0.2
    },
    {
        field: "price",
        headerName: "Цена",
        type: 'number',
        headerAlign: "left",
        align: "left",
        flex: 0.3
    },
    {
        field: "unitReport",
        headerName: "Упак",
        headerAlign: "left",
        align: "left",
        flex: 0.3
    },
    {
        field: "priceReport",
        headerName: "Цена",
        headerAlign: "left",
        align: "left",
        flex: 0.3
    },
];

const Products = () =>{
    const theme = useTheme();
    const [selected, setSelected] = useState([]);

    const [filterModel, setFilterModel] = useState({
        items: [
        ],
    });

    const [catalog, setCatalog] = useState(null);
    const [products, setProducts] = useState([]);
    const token = useSelector((state)=>state.token);

    const getCatalog = async () => {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}client/catalog`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setCatalog(data);
    };

    const getProducts = async ({id}) => {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}client/products?id=${id}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        setProducts([]);
        const data = await response.json();
        setProducts(data);
    };

    const handleSelect = (event, nodeId) => {
        setSelected(nodeId);

        getProducts({id:nodeId});

        //setFilterModel({items:[{ field: 'group', operator: 'contains', value: '' + nodeId}]});
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
                    onNodeSelect={handleSelect}
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
                <DataGrid
                    sx={{ height: 900, flexGrow: 1, minWidth:50, overflowY: 'auto' }}
                    columns={columns}
                    rows={products}
                    filterModel={filterModel}
                    rowSelection
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 20,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    //checkboxSelection
                    disableRowSelectionOnClick
                />
            </Grid>
        </Grid>
    )
};

export default Products;