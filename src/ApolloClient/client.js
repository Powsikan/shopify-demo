import {ApolloClient, InMemoryCache} from "@apollo/client";
import {BASE_URL} from "../constants/constant";

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: `${BASE_URL}/v1/graphql`,
});
