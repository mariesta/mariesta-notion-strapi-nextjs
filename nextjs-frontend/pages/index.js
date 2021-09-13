import PageList from "../components/page-list";

export default function Home() {
  return <PageList />;
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
