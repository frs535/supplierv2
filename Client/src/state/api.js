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
    ],
    endpoints: (build) => ({
        getProfile: build.query({
            query: (id) => `general/profile/${id}`,
            providesTags: ["Profile"],
        }),
        getProducts: build.query({
            query: () => `client/products`,
            providesTags: ["Products"],
        }),
        getCatalogs: build.query({
            query: () => `client/catalog`,
            providesTags: ["Catalogs"],
            // providesTags: (result, error, arg) =>
            //     result
            //         ? [...result.map(({ id }) => ({ type: 'Catalogs', id })), 'Catalogs']
            //         : ['Catalogs'],
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
} = clientApi