import React from 'react'
// import _ from 'lodash';
import { Query } from 'react-apollo';
// import { useQuery } from '@apollo/react-hooks';
import myQuery from '../../services/productsCategories';
// import myQuery from '../../services/producsData';
import './index.css'

import { useSelector, useDispatch } from 'react-redux';



export default function Sidebar() {

    const courses = useSelector(state => state.data);
    const dispatch = useDispatch();
    // const capiche = useSelector(state => state.showCase);
    // var menus = []

    // function buttonStyle(value) {
    //     dispatch({ type: 'SHOW_CASE', payload: { showCase: value } });
    //     console.log(courses);
    //     console.log(capiche);
    // }

    function funcSubcategory(value) {
        // buttonStyle(value);
        dispatch({ type: 'SHOW_CASE', payload: { showCase: value } });
        console.log(courses);
    }

    return (
        <Query query={myQuery}>
            {({ loading, error, data }) => {

                if (loading) return <div>Fetching</div>
                if (error) return <div>Error</div>

                const productCategories = data.productsList.items;
                var result = Object.values(productCategories.reduce((r, { category, subcategory }) => (r[category + '|' + subcategory] = { category, subcategory }, r), {}))

                var res = result.reduce(function (res, currentValue) {
                    if (res.indexOf(currentValue.category) === -1) {
                        res.push(currentValue.category);
                    }
                    return res;
                }, []).map(function (category) {
                    return {
                        category: category,
                        subcategory: result.filter(function (_el) {
                            return _el.category === category;
                        }).map(function (_el) { return _el.subcategory; })
                    }
                });

                return (
                    <>
                        <div className="left">
                            {res.map(({ category, subcategory: subItems, ...rest }) => (
                                <div key={category}>
                                    <p>{category}</p>
                                    {Array.isArray(subItems) ? (
                                        <div disablepadding>
                                            {subItems.map((subItem) => (
                                                <div key={subItem}>
                                                    <button className="astext" id = {subItem} onClick={() => funcSubcategory(subItem)}>
                                                        {subItem}
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : null}
                                </div>
                            ))}
                        </div>
                    </>

                );
            }
            }
        </Query>
    )


}



// import gql from 'graphql-tag';

// const myQuery = gql`
// query($content: String!) {
//   productsList(first: 10 filter: {
//     category: {
//       contains: $content
//     }
//   }) {
//     items {
//       category
//       subcategory
//     }
//   }
// }`

// function Sidebar() {

//     const capiche = 'Casa'

//     const [category, setCategory] = useState('Pet');
//     // const { loading, error, data } = useQuery(myQuery,  {variables: { content :  capiche }});

//     const { loading, error, data } = useQuery(myQuery);

//     useEffect(() => {
//       console.log(category);
//     }, [category]);

//     if (loading) return 'Loading...';
//     if (error) return `Error! ${ error.message }`;

//     console.log('oi');
//     console.log(data);

//     return (
//         <div>
//           {data.productsList.items.map(item => (
//             <>
//               <h1>{item.subcategory}</h1>
//                 <button key={item.id} value={item.category}>
//                   {item.category}
//                 </button>
//             </>
//           ))}        
//         </div>
//     );
//   }
//   export default Sidebar