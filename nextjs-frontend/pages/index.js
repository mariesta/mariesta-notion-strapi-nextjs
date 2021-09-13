import { initializeGraphQL } from "../lib/graphql-client";
import graphQLRequest from "../lib/graphql-request";
import App from "../components/app";
import PageList from "../components/page-list";

import { ALL_PAGES_QUERY } from "../lib/graphql-query-mutation";

export default function Home() {
  return (
    <App>
      <PageList />
    </App>
  );
}

export async function getStaticProps() {
  const client = initializeGraphQL();

  await graphQLRequest(client, ALL_PAGES_QUERY);

  return {
    props: {
      initialGraphQLState: client.cache.getInitialState(),
    },
    revalidate: 1,
  };
}
