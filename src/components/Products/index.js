import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// // import myQuery from '../../services/producsData';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import './index.css'

// export default function ProductList() {

//     // const items = useSelector(state => state.items);
//     const data = useSelector(state => state.data);
//      const capiche = 'Pet';

//     const dispatch = useDispatch();

//     const { loading, error, datas } = useQuery(myQuery);
//     //  const { loading, error, datas } = useQuery(myQuery,  { variables: { content :  capiche }});

//     if (loading) return 'Loading...';
//     if (error) return `Error! ${ error.message }`;

//     // console.log(error);
//     console.log('oi');
//     console.log(datas);
//     // const productItems = datas.productsList.items;


//     // function insertCart(value, allItems) {

//     //     const idAdd = allItems.find(idx => idx.id === value);
//     //     // const objIndex = allItems.findIndex((obj => obj.id === value));

//     //     if (!data.find(idx => idx.productId === value)) {
//     //         idAdd.id = value;
//     //     }
//     //     else {
//     //         idAdd.id = Object.keys(data).length;
//     //     }
//     //     idAdd.productId = idAdd.id;

//     //     dispatch({ type: 'ADD_TO_CART', payload: { idAdd } });
//     //     // items[objIndex].status = false;
//     //     console.log(data);
//     // }

//     // function refresh() {
//     //     console.log(data);
//     // }

//     // function disabledCheck(value){
//     //     if (!data.find(idx => idx.productId === value)) {
//     //         return false;
//     //     } else{
//     //         return true;
//     //     }
//     // }


//     return (
//         <>
//             {/* <button onClick={() => refresh()}>REFRESH</button>
//                 return (
//                     <div>
//                         {productItems.map(productItem => {
//                             return (
//                                 <div>
//                                 <span className="cart_item_name">{productItem.title}</span>
//                                 <div className="image"><img src={productItem.image.downloadUrl} alt={productItem.title} height="200" width="200" /></div>
//                                 <button type="button" disabled={disabledCheck(productItem.id)} onClick={() => insertCart(productItem.id, productItems)}>AAAAAA</button>
//                                 </div>
//                             )
//                         }
//                         )}
//                     </div>
//                 );
//                 }
//                 } */}
//         </>
//     );
// }

const myQuery = gql`
query($content: String!) {
  productsList(first: 20 filter: {
    subcategory: {
      contains: $content
    }
  }) {
    items {
      id
      title
      value
      image {
        downloadUrl
      }
      typePrice
      maxProducts
      qty
      status
      category
      subcategory      
    }
  }
}`

function ProductList() {


  const dataCart = useSelector(state => state.data);

  const dispatch = useDispatch();

  function disabledCheck(value) {
    if (!dataCart.find(idx => idx.productId === value)) {
      return false;
    } else {
      return true;
    }
  }

  function insertCart(value, allItems) {

    const idAdd = allItems.find(idx => idx.id === value);
    // const objIndex = allItems.findIndex((obj => obj.id === value));

    if (!dataCart.find(idx => idx.productId === value)) {
      idAdd.id = value;
    }
    else {
      idAdd.id = Object.keys(dataCart).length;
    }
    idAdd.productId = idAdd.id;

    dispatch({ type: 'ADD_TO_CART', payload: { idAdd } });
    // items[objIndex].status = false;
    console.log(dataCart);
  }
  let capiche = useSelector(state => state.showCase);
  capiche = Object.values(capiche)[0];

  const { loading, error, data } = useQuery(myQuery, { variables: { content: capiche } });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <div className="wrapper">
      {data.productsList.items.map(item => (
        
        <div className="root">
          <img className="imgProduct" src={item.image.downloadUrl} alt={item.title} />
          <p className="title">{item.title}</p>
          <div className="row">
            <div className="column">
              <p className="price">{item.value}/{item.typePrice}</p>
            </div>
            <div className="column">
              <div className="par">
                <button type="button" disabled={disabledCheck(item.id)} onClick={() => insertCart(item.id, data.productsList.items)} className="circular"></button>
                <button className="comprar"></button>
              </div>
            </div>
          </div>
          </div>
        
        
      ))}
      </div>
    </>
  );
}
export default ProductList