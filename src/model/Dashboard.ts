export interface Dashboard  {
    createdDate: string;
    lastModifiedDate: string;
    createdBy: string;
    modifiedBy: string;
    id: string;
    purchaseDate: string;
    organizationId: number;
    platformId: number;
    platformStoreId: number;
    platformDataType: string;
    uniqueId: string;
    totalSalesAmount: number;
    totalDiscountAmount: number;
    totalTaxAmount: number;
    currency: string;
    totalOrderItemsQty: number;
    dashboardTypeIds: [string];
}
