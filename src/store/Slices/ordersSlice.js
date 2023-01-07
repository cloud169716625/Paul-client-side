import { createSlice } from "@reduxjs/toolkit";

const mockOrder = {
  orderNo: 68,
  customerIP: null,
  clientId: "03ae8674-65a2-4b19-bbe7-cd994becc747",
  adminAssigned: "5d1d5767-cff1-43d9-9b8f-2880898cff7b",
  clientFullName: 'Test Client',
  adminAssignedFullName: null,
  notes: "Lorem Ipsum...",
  createdOn: "2022-09-13T17:29:56.4151483",
  lastModifiedOn: "2022-11-17T13:29:22.3115475",
  status: 2,
  bill: {
    id: "46dd7907-6ef7-4999-bcc3-de5b267f6570",
    billNo: "#Invoice-68",
    userId: "5d1d5767-cff1-43d9-9b8f-2880898cff7b",
    product: null,
    status: 0,
    orderId: "4d000ee1-289e-4009-aa78-034e45fba498",
    dueDate: "2022-09-20T23:32:25.5796023",
    subTotal: 560.0,
    vat: 400.0,
    orderProductLineItems: null,
  },
  products: [
    {
      id: "6d7d1c60-2229-45e8-a28d-33a56816b5fa",
      productNo: 58,
      orderId: "4d000ee1-289e-4009-aa78-034e45fba498",
      name: "Dedicated Server - Intel Xeon E3 1230 V3 edited",
      description: "Intel Xeon E3 1230 V3 Dedicated Server edited",
      thumbnail: "Files/Images/Product/electronicproduct.jpg",
      productDepartments: [],
      productLineItems: [],
      status: 2,
      paymentType: 1,
      notes: "Test notes for this product",
      registrationDate: "2022-09-12T11:29:52.391",
      nextDueDate: "2022-09-12T11:29:52.391",
      terminationDate: null,
      overrideSuspensionDate: "0001-01-01T00:00:00",
      overrideTerminationDate: "0001-01-01T00:00:00",
      userId: null,
      base64Image: null,
      assignedToClientId: "03ae8674-65a2-4b19-bbe7-cd994becc747",
      assignedClient: null,
      billingCycle: 1,
      deletedOn: null,
      deletedBy: null,
      dedicatedIP: "154.222.27.1",
      assginedIPs: null,
      invoiceId: "00000000-0000-0000-0000-000000000000",
    },
  ],
  orderProductLineItems: [
    {
      id: "7841bab0-17c8-41a3-9c8c-4e3f55b53959",
      lineItem: "1 Gbps Dedicated Port",
      price: 0.0,
      createdOn: "2022-09-13T17:29:56.440016",
      lastModifiedOn: "2022-09-13T17:29:56.440016",
      priceType: 0,
      deletedOn: null,
      deletedBy: null,
    },
    {
      id: "a38561bd-5995-4566-a010-3cb609d8cd5e",
      lineItem: "KVM Over IP",
      price: 0.0,
      createdOn: "2022-09-13T17:29:56.440014",
      lastModifiedOn: "2022-09-13T17:29:56.440014",
      priceType: 0,
      deletedOn: null,
      deletedBy: null,
    },
    {
      id: "f114da01-824c-4375-9545-d3a253e2b3b5",
      lineItem: "Unmetered Bandwidth",
      price: 0.0,
      createdOn: "2022-09-13T17:29:56.4400123",
      lastModifiedOn: "2022-09-13T17:29:56.4400123",
      priceType: 0,
      deletedOn: null,
      deletedBy: null,
    },
    {
      id: "2d59c9c3-f94d-4449-a0bc-9128308ec893",
      lineItem: "1 TB First Drive",
      price: 10.0,
      createdOn: "2022-09-13T17:29:56.4400106",
      lastModifiedOn: "2022-09-13T17:29:56.4400107",
      priceType: 0,
      deletedOn: null,
      deletedBy: null,
    },
    {
      id: "0f980274-e016-4271-b0e7-7e0322be12d7",
      lineItem: "64 GB RAM",
      price: 50.0,
      createdOn: "2022-09-13T17:29:56.4400089",
      lastModifiedOn: "2022-09-13T17:29:56.4400089",
      priceType: 0,
      deletedOn: null,
      deletedBy: null,
    },
    {
      id: "0b2d5885-b18e-4c40-ba61-61a8257b8228",
      lineItem: "CPU",
      price: 100.0,
      createdOn: "2022-09-13T17:29:56.4399992",
      lastModifiedOn: "2022-09-13T17:29:56.4399993",
      priceType: 0,
      deletedOn: null,
      deletedBy: null,
    },
  ],
  subTotal: 560.0,
  totalPrice: 960.0,
};

const initialState = {
  allOrders: [],
  loading: false,
  orders: [],
  order: mockOrder, // null,
  orderTemplates: [],
  orderTemplate: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    getOrderTemplates: (state, { payload }) => {
      state.orderTemplates = payload;
    },
    getOrders: (state, { payload }) => {
      state.orders = payload;
    },
    setOrderLoading: (state, { payload }) => {
      state.loading = payload;
    },
    getAllOrders: (state, { payload }) => {
      state.allOrders = payload;
    },
    getOrder: (state, { payload }) => {
      // state.order = payload;
    },
    getOrderTemplate: (state, { payload }) => {
      state.orderTemplate = payload;
    },
  },
});

const { reducer, actions } = ordersSlice;
export const {
  getOrders,
  getOrder,
  setOrderLoading,
  getOrderTemplate,
  getOrderTemplates,
  getAllOrders,
} = actions;

export default reducer;
