import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL,
        prepareHeaders: (headers, { getState })=>{
            const state = getState();
            if (state){
                headers.set('authorization', `Bearer ${state.token}`)
                return headers
            }
        }
    }),
    reducerPath: "adminApi",
    tagTypes: [
        "User",
        "Profile",
        "Products",
        "Catalog",
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
            query: (id) => `client/products/${id}`,
            providesTags: ["Products"],
        }),
        getCatalogs: build.query({
            query: () => `client/catalog`,
            providesTags: ["Catalog"],
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
} = api