import React from 'react';
import { useDispatch } from 'react-redux';
import { Query } from 'react-apollo';
import myQuery from '../../services/productsCategories';
import './index.css';
import { funcSubcategory } from '../../actions/cartActions';

export default function Sidebar() {
  const dispatch = useDispatch();

  function func_Subcategory(value) {
    dispatch(funcSubcategory({ value }));
  }

  return (
    <Query query={myQuery}>
      {({ loading, error, data }) => {
        if (loading) return <div>Fetching</div>;
        if (error) return <div>Error</div>;

        const productCategories = data.productsList.items;
        const result = Object.values(
          productCategories.reduce(
            (r, { category, subcategory }) => (
              (r[category + '|' + subcategory] = { category, subcategory }), r
            ),
            {}
          )
        );

        const res = result
          .reduce((resArr, currentValue) => {
            if (resArr.indexOf(currentValue.category) === -1) {
              resArr.push(currentValue.category);
            }
            return resArr;
          }, [])
          .map((category) => {
            return {
              category,
              subcategory: result
                .filter((_el) => {
                  return _el.category === category;
                })
                .map((_el) => {
                  return _el.subcategory;
                }),
            };
          });
        return (
          <>
            <div className="left">
              {res.map(({ category, subcategory: subItems }) => (
                <div key={category}>
                  <p>{category}</p>
                  {Array.isArray(subItems) ? (
                    <div disablepadding>
                      {subItems.map((subItem) => (
                        <div key={subItem}>
                          <button
                            type="button"
                            className="astext"
                            id={subItem}
                            onClick={() => func_Subcategory(subItem)}
                          >
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
      }}
    </Query>
  );
}
