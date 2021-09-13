import Page from "../components/page";

export default function SinglePage({ id }) {
  return <Page id={id} />;
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  return {
    props: { id },
  };
}
