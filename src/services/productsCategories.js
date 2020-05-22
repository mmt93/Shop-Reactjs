import gql from 'graphql-tag';

const myQuery = gql`
    query {
        productsList {
            items {
                category
                subcategory
            }
        }
    }`;
export default myQuery;
