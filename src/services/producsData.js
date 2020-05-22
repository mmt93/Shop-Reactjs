import gql from 'graphql-tag';

// const myQuery = gql`
// query($content: String!) {
//   productsList(first: 10 filter: {
//     category: {
//       contains: $content
//     }
//   }) {
//     items {
//         id
//         title
//         value
//         image {
//             downloadUrl
//         }
//         typePrice
//         maxProducts
//         qty
//         status
//         category
//         subcategory
//     }
//   }
// }`

// export default myQuery;





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
