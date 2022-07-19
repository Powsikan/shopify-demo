export interface PlatformAuth {
    organizationId: number;
    platformStoreId: number;
    applicationId: string;
    applicationSecret: string;
    grantType: string;
    authRequestUrl: string;
    authToken: string;
    authScope: string;
}
