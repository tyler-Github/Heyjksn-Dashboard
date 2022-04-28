import { Grid, GridItem, Spinner } from "@chakra-ui/react";
import { Panel, PanelBody, PanelTitle } from "../../../components/Panel";
import { useMetadata } from "../../../lib/hooks/use-metadata";

// TODO: Fix Grid Components and any
const BrowserTableContainer = ({ filters }: any) => {
  const { data, isLoading, isError } = useMetadata("browser", filters);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Whoops.. Something bad happened!</div>;
  }

  const heading = (
    <>
      <GridItem colSpan={2}>Name</GridItem>
      <GridItem textAlign="right">Views</GridItem>
      <GridItem textAlign="right">Unique</GridItem>
    </>
  );

  // TODO: Fix this any
  const rows = data.map((row: any) => (
    <>
      <GridItem colSpan={2}>{row.element}</GridItem>
      <GridItem textAlign="right">{row.views}</GridItem>
      <GridItem textAlign="right">{row.unique}</GridItem>
    </>
  ));

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={2}>
      {heading}
      {rows}
    </Grid>
  );
};

// TODO: Fix this any
export function BrowserTable({ filters }: any) {
  return (
    <Panel flex={1}>
      <PanelTitle>Browser</PanelTitle>
      <PanelBody>
        <BrowserTableContainer filters={filters} />
      </PanelBody>
    </Panel>
  );
}
