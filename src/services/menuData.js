import gql from 'graphql-tag';

const myCategories = gql`
  query {
    items {
      id
      category
      subcategory
    }
  }
`;

export default myCategories;
