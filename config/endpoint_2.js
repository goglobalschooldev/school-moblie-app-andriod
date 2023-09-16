import { GraphQLClient } from "graphql-request";

const endpoint = "https://endpoint-visitor-school.go-globalit.com/graphql";
// const endpoint = "http://192.168.2.30:4300/graphql";
const graphQLClient = new GraphQLClient(endpoint);

export default graphQLClient;
