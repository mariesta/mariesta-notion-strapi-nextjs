import { useQuery, useMutation } from "graphql-hooks";
import { useRouter } from "next/router";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Breadcrumbs from "./breadcrumbs";
import TextField from "@material-ui/core/TextField";

import Content from "./content";
import ErrorMessage from "./error-message";

import {
  PAGE_QUERY,
  DELETE_PAGE_MUTATION,
  UPDATE_PAGE_MUTATION,
} from "../lib/graphql-query-mutation";
import { useState } from "react";

export default function Page({ id }) {
  const [newTitle, setNewTitle] = useState("");
  const [editTitle, setEditTitle] = useState(false);
  const { error, data, refetch } = useQuery(PAGE_QUERY, { variables: { id } });
  const [updatePage] = useMutation(UPDATE_PAGE_MUTATION);
  const [deletePage] = useMutation(DELETE_PAGE_MUTATION);
  const router = useRouter();

  if (error) return <ErrorMessage message="Error loading page." />;
  if (!data) return <div>Loading</div>;

  const { page } = data;
  const { content_blocks, title } = page;

  const updateTitle = async () => {
    await updatePage({ variables: { id, title: newTitle } });
    setEditTitle(false);
    setNewTitle("");
    refetch();
  };

  const remove = async () => {
    await deletePage({ variables: { id } });
    router.push(`/`);
  };

  return (
    <Grid container>
      <Breadcrumbs id={id} title={title} />
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          {editTitle ? (
            <Grid item>
              <TextField
                label="New Title"
                variant="outlined"
                value={newTitle}
                onChange={(event) => setNewTitle(event.target.value)}
              />
              <Button
                variant="outlined"
                color="primary"
                onClick={updateTitle}
                style={{ marginLeft: 20 }}
              >
                Save
              </Button>
            </Grid>
          ) : (
            <Grid item>
              <Typography variant="h3">{title}</Typography>
            </Grid>
          )}
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setEditTitle(true)}
            style={{ marginRight: 20 }}
          >
            Edit Title
          </Button>
          <Button variant="outlined" color="secondary" onClick={remove}>
            Delete
          </Button>
        </Grid>
      </Grid>
      <Content
        pageId={id}
        refetchPage={refetch}
        content_blocks={content_blocks}
      />
    </Grid>
  );
}
