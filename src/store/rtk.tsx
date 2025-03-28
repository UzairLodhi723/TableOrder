import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const BASE_URL = "http://192.168.18.240:5000/api/v1/";
const BASE_URL = "http://34.28.168.5/order/api/v1/";
export const Images_URL = "http://34.28.168.5/order/public/";
const endpoints = {
  register: "auth/register",
  login: "auth/login",
  dishImage: "menu/dishimage",
  addDish: "menu/",
  addCategory: "menu/category",
  QRCOde:"qrcode",
  notification:"notification",
  order:"order",
  payment:"order/payment",
  user:"user/",
  avatar:"user/avatar/",
  dashboard:"user/dashboard/",
  analytics:"user/analytics/"
};

export const tableOder = createApi({
  reducerPath: "tableOrder",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }: any) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["refetchAllDishes","refetchAllCategory", "refetchAllQRCode","refetchAllnotification", "refetchAllOrders","refetchuser"  ],
  keepUnusedDataFor: 60,
  refetchOnFocus: true, 
  refetchOnReconnect: true, 
  refetchOnMountOrArgChange: true, 
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: endpoints.register,
        method: "post",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: endpoints.login,
        method: "post",
        body: data,
      }),
    }),
    // Dish
    uploadDishImage: builder.mutation<{}, FormData>({
      query: (data) => ({
        url: endpoints.dishImage,
        method: "POST",
        body: data,
      }),
    }),
    addDish: builder.mutation({
      query: (data) => ({
        url: endpoints.addDish,
        method: "POST",
        body: data,
      }),
      invalidatesTags:["refetchAllDishes"]
    }),
    updateDish: builder.mutation({
      query: (data) => ({
        url: `${endpoints.addDish}/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags:["refetchAllDishes"]
    }),
    getAllDish:  builder.query({
      query: () => endpoints.addDish,
      providesTags : ["refetchAllDishes"],
    }),
    // Category
    getAllCategory:  builder.query({
      query: () => endpoints.addCategory,
      providesTags : ["refetchAllCategory"],
    }),
    addCategory: builder.mutation({
      query: (data) => ({
        url: endpoints.addCategory,
        method: "POST",
        body: data,
      }),
      invalidatesTags:["refetchAllCategory"]
    }),
    updateCategory: builder.mutation({
      query: (data) => ({
        url: `${endpoints.addCategory}/${data?.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags:["refetchAllCategory"]
    }),
    deleteCategory: builder.mutation({
      query: (data) => ({
        url: `${endpoints.addCategory}/${data?.id}`,
        method: "DELETE",
      }),
      invalidatesTags:["refetchAllCategory"]
    }),
    // QRCode
    createQR: builder.mutation({
      query: (data) => ({
        url: endpoints.QRCOde,
        method: "POST",
        body: data,
      }),
      invalidatesTags:["refetchAllQRCode"]
    }),
    getAllQRCode:  builder.query({
      query: () => endpoints.QRCOde,
      providesTags : ["refetchAllQRCode"],
    }),
    updateQRCode: builder.mutation({
      query: (data) => ({
        url: `${endpoints.QRCOde}/${data?.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags:["refetchAllQRCode"]
    }),
    deleteQRCode: builder.mutation({
      query: (data) => ({
        url: `${endpoints.QRCOde}/${data?.id}`,
        method: "DELETE",
      }),
      invalidatesTags:["refetchAllQRCode"]
    }),
    // Notification
    addNotification: builder.mutation({
      query: (data) => ({
        url: endpoints.notification,
        method: "POST",
        body: data,
      }),
      invalidatesTags:["refetchAllnotification"]
    }),
    getAllNotification:  builder.query({
      query: () => endpoints.notification,
      providesTags : ["refetchAllnotification"],
    }),
    // Dashboard
    getDashboard:  builder.query({
      query: () => endpoints.dashboard,
    }),
    // Analytics
    getAnalytics:  builder.query({
      query: () => endpoints.analytics,
    }),
    // Order 
    addOrder: builder.mutation({
      query: (data) => ({
        url: endpoints.order,
        method: "POST",
        body: data,
      }),
      invalidatesTags:["refetchAllOrders"]
    }),
    getAllOrders:  builder.query({
      query: () => endpoints.order,
      providesTags : ["refetchAllOrders"],
    }),
    updateOrder: builder.mutation({
      query: (data) => ({
        url: `${endpoints.order}/${data?.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags:["refetchAllOrders"]
    }),

    getUser:  builder.query({
      query: () => endpoints.user,
      providesTags : ["refetchuser"],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${endpoints.user}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags:["refetchuser"]
    }),
     // user avatar
     uploadAvatar: builder.mutation<{}, FormData>({
      query: (data) => ({
        url: endpoints.avatar,
        method: "POST",
        body: data,
      }),
      invalidatesTags:["refetchuser"]
    }),
    getAllPayment:  builder.query({
      query: () => endpoints.payment,
      providesTags : ["refetchAllOrders"],
    }),
    updatePayment: builder.mutation({
      query: (data) => ({
        url: `${endpoints.payment}/${data?.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags:["refetchAllOrders"]
    }),
  }),
  
});

export const {
  //auth
  useSignupMutation,
  useLoginMutation,
  // dish
  useUploadDishImageMutation,
  useAddDishMutation,
  useUpdateDishMutation,
  useGetAllDishQuery,
  // category
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoryQuery,
  useUpdateCategoryMutation,
  // QRcode
  useCreateQRMutation,
  useGetAllQRCodeQuery,
  useUpdateQRCodeMutation,
  useDeleteQRCodeMutation,
  // Dashboard
  useGetDashboardQuery,
  // Analytics
  useGetAnalyticsQuery,
  // Notification
  useAddNotificationMutation,
  useGetAllNotificationQuery,
  // Orders
  useAddOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
  // Payment
  useGetAllPaymentQuery,
  useUpdatePaymentMutation,
  //user
  useGetUserQuery,
  useUpdateUserMutation,
  useUploadAvatarMutation
} = tableOder;
