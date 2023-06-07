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

const Product = ({
                     _id,
                     name,
                     description,
                     price,
                     rating,
                     category,
                     supply,
                     stat,
                 }) => {
    const theme = useTheme();
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <Card
            sx={{
                backgroundImage: "none",
                backgroundColor: theme.palette.background.alt,
                borderRadius: "0.55rem",
            }}
        >
            <CardContent>
                <Typography
                    sx={{ fontSize: 14 }}
                    color={theme.palette.secondary[700]}
                    gutterBottom
                >
                    {category}
                </Typography>
                <Typography variant="h5" component="div">
                    {name}
                </Typography>
                <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
                    ${Number(price).toFixed(2)}
                </Typography>
                <Rating value={rating} readOnly />

                <Typography variant="body2">{description}</Typography>
            </CardContent>
            <CardActions>
                <Button
                    variant="primary"
                    size="small"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    See More
                </Button>
            </CardActions>
            <Collapse
                in={isExpanded}
                timeout="auto"
                unmountOnExit
                sx={{
                    color: theme.palette.neutral[300],
                }}
            >
                <CardContent>
                    <Typography>id: {_id}</Typography>
                    <Typography>Supply Left: {supply}</Typography>
                    <Typography>
                        Yearly Sales This Year: {stat.yearlySalesTotal}
                    </Typography>
                    <Typography>
                        Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
};

// const catalog ={
//     id:0,
//     name: "Корневая папка",
//     child: [
//     {id: 1, name: 'Alice', child: [
//             {id: 11, name: 'Alice 11', child:[
//                     {id: 111, name: 'Alice 111', child: null},
//                     {id: 112, name: 'Alice 112', child: null}
//                 ]},
//             {id: 12, name: 'Alice 12', child: []},
//             {id: 13, name: 'Alice 13', child: []}
//         ]},
//     {id: 2, name: 'Bob', child: []},
//     {id: 3, name: 'Carl', child: [
//             {id: 31, name: 'Carl 31', child: [
//                     {id: 311, name: 'Calr 311', child: []}
//                 ]},
//             {id: 32, name: 'Carl 32', child: []}
//         ]},
// ]};

const data =[
    {id: 1, code:1, name:"Test", unit: 'st', quantity: 10, price: 100, group:'1,2'},
    {id: 2, code:2, name:"Test", unit: 'st', quantity: 10, price: 100, group:'1,2,3'},
    {id: 3, code:3, name:"Test", unit: 'st', quantity: 10, price: 100, group:'3'},
    {id: 4, code:4, name:"Test", unit: 'st', quantity: 10, price: 100, group:'1,3'},
    {id: 5, code:5, name:"Test", unit: 'st', quantity: 10, price: 100, group:'2,3'},
    {id: 6, code:6, name:"Test", unit: 'st', quantity: 10, price: 100, group:'1,2'},
    {id: 7, code:7, name:"Test", unit: 'st', quantity: 10, price: 100, group:'1,2'},
    {id: 8, code:8, name:"Test", unit: 'st', quantity: 10, price: 100, group:'1,3'},
    {id: 9, code:9, name:"Test", unit: 'st', quantity: 10, price: 100, group:'1,2'},
    {id: 10, code:10, name:"Test", unit: 'st', quantity: 10, price: 100, group:'1,2'},
    {id: 11, code:11, name:"Test", unit: 'st', quantity: 10, price: 100, group:'1,2'},
    {id: 12, code:12, name:"Test", unit: 'st', quantity: 10, price: 100, group:'1,2'},
    {id: 13, code:13, name:"Test", unit: 'st', quantity: 10, price: 100, group:'1,2'},
];

const columns = [
    {
        field: "code",
        headerName: "Код",
        headerAlign: "left",
        align: "left",
        flex: 0.1
    },
    {
        field: "name",
        headerName: "Товар",
        headerAlign: "left",
        align: "left",
        flex: 1
    },
    {
        field: "unit",
        headerName: "Единица",
        headerAlign: "left",
        align: "left",
        flex: 0.2
    },
    {
        field: "quantity",
        headerName: "Количество",
        type: 'number',
        headerAlign: "left",
        align: "left",
        flex: 0.3
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
        field: "group",
        headerName: "Группы",
        headerAlign: "left",
        align: "left",
        flex: 0.3
    },
];

const Products = () =>{

    const [selected, setSelected] = useState([]);

    const [filterModel, setFilterModel] = useState({
        items: [
        ],
    });

    const [catalog, setCatalog] = useState(null);
    const token = useSelector((state)=>state.token);

    const getCatalog = async () => {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}client/catalog`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setCatalog(data);
    };

    const handleSelect = (event, nodeIds) => {
        setSelected(nodeId);

        //const {data} = useGetProductsQuery(id);

        setFilterModel({items:[{ field: 'group', operator: 'contains', value: nodeId}]});
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
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <TreeView
                    aria-label="rich object"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpanded={['root']}
                    defaultExpandIcon={<ChevronRightIcon />}
                    sx={{ height: 'auto', flexGrow: 1, minWidth:50, maxWidth: 300, overflowY: 'auto' }}
                    selected={selected}
                    onNodeSelect={handleSelect}
                >
                    {catalog? renderTree({id: 0, name:"Корневой каталог", child:catalog}) : <>Loading...</> }
                </TreeView>
            </Grid>
            <Grid item xs={9}>
                <DataGrid
                    columns={columns}
                    rows={data}
                    filterModel={filterModel}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 50,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    //checkboxSelection
                    //disableRowSelectionOnClick
                />
            </Grid>
        </Grid>
    )
};

// const Products = () => {
//     const { data, isLoading } = useGetProductsQuery();
//     const isNonMobile = useMediaQuery("(min-width: 1000px)");
//
//     return (
//         <Box m="1.5rem 2.5rem">
//             <Header title="PRODUCTS" subtitle="See your list of products." />
//             {data || !isLoading ? (
//                 <Box
//                     mt="20px"
//                     display="grid"
//                     gridTemplateColumns="repeat(4, minmax(0, 1fr))"
//                     justifyContent="space-between"
//                     rowGap="20px"
//                     columnGap="1.33%"
//                     sx={{
//                         "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
//                     }}
//                 >
//                     {data.map(
//                         ({
//                              _id,
//                              name,
//                              description,
//                              price,
//                              rating,
//                              category,
//                              supply,
//                              stat,
//                          }) => (
//                             <Product
//                                 key={_id}
//                                 _id={_id}
//                                 name={name}
//                                 description={description}
//                                 price={price}
//                                 rating={rating}
//                                 category={category}
//                                 supply={supply}
//                                 stat={stat}
//                             />
//                         )
//                     )}
//                 </Box>
//             ) : (
//                 <>Loading...</>
//             )}
//         </Box>
//     );
// };

export default Products;