import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const clientApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL,
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
        "Customers",
        "Sales",
        "Admins",
        "Performance",
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
            // providesTags: (result, error, arg) =>
            //     result
            //         ? [...result.map(({ id }) => ({ type: 'Catalogs', id })), 'Catalogs']
            //         : ['Catalogs'],
        }),

        getOrder: build.query({
            query: ({id})=>({
                url: `client/orders/${id}`
            }),
            providesTags: ["Orders"],
        }),

        updateOrder: build.mutation({
           query: ({order}) =>({
               url: `client/orders`,
               method: "POST",
               body: order
           }),
             invalidatesTags: (result, error, {id}) => [
                {type: "Orders", id}
            ], //["Orders"],
            providesTags: (result, error, arg) => [
                //{type: "Order", id: arg} ,
                {type: "Orders", id: "ALL"} //Если необходимо инвалидировать все теги
            ],
            // async onQueryStarted({id, ...body}, {dispatch, queryFulfilled}) {
            //     const patchResult = dispatch(
            //         clientApi.util.updateQueryData('getOrder', id, (draft) => Object.assign(draft, body)))
            //     try {
            //         await queryFulfilled
            //     } catch {
            //         patchResult.undo()
            //     }
            // }
        }),


        getCustomers: build.query({
            query: () => "client/customers",
            providesTags: ["Customers"],
        }),
        getTransactions: build.query({
            query: ({ page, pageSize, sort, search }) => ({
                url: "client/transactions",
                method: "GET",
                params: { page, pageSize, sort, search },
            }),
            providesTags: ["Transactions"],
        }),
        getSales: build.query({
            query: () => "sales/sales",
            providesTags: ["Sales"],
        }),
        getAdmins: build.query({
            query: () => "management/admins",
            providesTags: ["Admins"],
        }),
        getUserPerformance: build.query({
            query: (id) => `management/performance/${id}`,
            providesTags: ["Performance"],
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
    useUpdateOrderMutation,
} = clientApi