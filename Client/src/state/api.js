import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const clientApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_BASE_PORT}`, //process.env.REACT_APP_BASE_URL,
        prepareHeaders: (headers, { getState })=>{
            const state = getState();
            if (state){
                headers.set('authorization', `Bearer ${state.global.token}`)
                return headers
            }
        }
    }),
    reducerPath: "clientApi",
    tagTypes: [
        "User",
        "Profile",
        "Products",
        "Catalogs",
        "Dashboard",
        "Images",
        "Orders"
    ],
    endpoints: (build) => ({
        getProfile: build.query({
            query: (id) => `general/profile/${id}`,
            providesTags: ["Profile"],
        }),
        getProducts: build.query({
            query: ({groupId}) => ({
                url: "client/products",
                method: "GET",
                params: {groupId}
            }),
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Products', id })), 'Products']
                    : ['Products'],
        }),

        getProduct: build.query({
            query: (id) =>({
                url: "client/product",
                method: "GET",
                params: { id }
            }),
            providesTags: ["Product"],
        }),

        getProductImages: build.query({
            query: ({id})=>({
                url: `/images/${id}/product`,
                method: "GET",
                params: {id, type: "product"}
            }),
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Images', id })), 'Images']
                    : ['Images'],
        }),

        getCatalogs: build.query({
            query: () => "client/catalog",
            providesTags: ["Catalogs"],
        }),

        getOrders: build.query({
            query: ({ page, pageSize, sort })=>({
                url: `client/orders`,
                method: "GET",
                params: { page, pageSize, sort },
            }),
            providesTags: ['Orders'],
        }),

        getOrder: build.query({
            query: (id) => ({
                url: `client/order/${id}`,
                method: "GET",
                params: {id: id}
            }),
            providesTags: ['Order'],
        }),

        updateOrder: build.mutation({
           query: ({order}) =>({
               url: `client/orders`,
               method: "POST",
               body: order
           }),
             invalidatesTags: (result, error, {id}) => [
                {type: "Orders, Order", id: `${result.id}_${result.updatedAt}`}
            ], //["Orders"],
            providesTags: (result, error, arg) => [
                {type: "Orders", id: "ALL"}
            ],
        }),

        getDashboard: build.query({
            query: () => "general/dashboard",
            providesTags: ["Dashboard"],
        }),
    })
})

export const {
    useGetProfileQuery,
    useGetProductsQuery,
    useGetCatalogsQuery,
    useGetCustomersQuery,
    useGetTransactionsQuery,
    useGetSalesQuery,
    useGetAdminsQuery,
    useGetUserPerformanceQuery,
    useGetDashboardQuery,
    useGetProductImagesQuery,
    useGetProductQuery,
    useGetOrderQuery,
    useGetOrdersQuery,
    useUpdateOrderMutation,
} = clientApi