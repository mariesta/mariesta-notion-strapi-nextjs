export const ALL_PAGES_QUERY = `
  query getAllPages {
    pages {
      id,
      title
    }
  }
`;

export const PAGE_QUERY = `
  query getPage($id: ID!) {
    page(id: $id) {
      id,
      title,
      content_blocks {
        id,
        content,
      }
    }
  }
`;

export const CREATE_PAGE_MUTATION = `
mutation createPage($title: String!) {
  createPage(input: { data: { title: $title}}) {
    page {
      id,
      title
    }
  }
}`;

export const UPDATE_PAGE_MUTATION = `
mutation updatePage($id: ID!, $title: String!) {
  updatePage(input: {
  	where: { id: $id }
    data: {
      title: $title
    }
  }) {
    page {
      id,
      title,
      content_blocks {
        id,
        content,
        order
      }
    }
  }
}
`;

export const DELETE_PAGE_MUTATION = `
mutation deletePage($id: ID!) {
  deletePage(input: {
  	where: { id: $id }
  }) {
    page {
      id,
      title
    }
  }
}`;

export const CREATE_BLOCKS_MUTATION = `
    mutation createContentBlock($content: String!, $pageId: ID!) {
        createContentBlock(input: {
        data: {
          content: $content,
          page: $pageId
        }
    }) 
    {
        contentBlock {
            id,
            page {
              id
            },
            content,
        }
      }
    }
`;

export const UPDATE_BLOCKS_MUTATION = `
    mutation updateContentBlock($id: ID!, $content: String!) {
        updateContentBlock(input: {
        where: { id: $id},
        data: {
          content: $content
        }
    
    }) 
    {
        contentBlock {
            id,
            content,
        }
      }
    }
`;

export const DELETE_BLOCK_MUTATION = `
mutation deleteContentBlock($id: ID!) {
  deleteContentBlock(input: {
  	where: { id: $id }
  }) {
    contentBlock {
      id,
      content
    }
  }
}`;
