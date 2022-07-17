import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCategory } from 'slices/category';
import CategoryList from 'components/Common/CatgegoryList';
import { setCategoryList, getCategoryList } from 'firebaseConfig';
// import { mapCategoryIdToIcon } from '@/helpers/categoryHelper';
// import { useCategories } from '@/hooks/categories';
// import { useDispatch, useSelector } from 'react-redux';
// import CategoryLoadingItem from './CategoryLoadingItem';


const Category = () => {
  const dispatch = useDispatch();

  console.log("CategoryList", CategoryList)

  // const result = setCategoryList(CategoryList);
  // console.log(result, "fuckyou")

  useEffect(() => {
    // dispatch(setCategoryList(CategoryList));
    // const getResult = getCategoryList();
    // dispatch(getCategoryList());
    // console.log(getResult, "fuckyoutoo");
  }, [])
  // const { selectedCategory, activeTab } = useSelector((state) => state.book);
  // const { isLoading, categories } = useCategories();

  // /** event change handler */
  // const handleChange = (id, name) => {
  //   dispatch(
  //     setSelectedCategory({
  //       id,
  //       name,
  //     })
  //   );
  // };

  return (
    <div className="mx-3 text-base-100">
      <div className="gap-x-2 items-center mb-10 carousel">
        <label className="input-pill__container">
          {/* <input
            type="radio"
            name="category"
            className="peer"
            checked={selectedCategory === null}
            onChange={() => dispatch(setSelectedCategory(null))}
          /> */}
          <div className="input-pill__item">🎧 All Categories</div>
        </label>

        {/* {categories &&
          categories.map(({ id, name }) => (
            <label key={id} className="category-option input-pill__container">
              <input
                type="radio"
                name="category"
                className="peer"
                checked={selectedCategory?.id === id}
                onChange={() => handleChange(id, name)}
              />
              <div className="input-pill__item">
                {mapCategoryIdToIcon(id)} {name}
              </div>
            </label>
          ))} */}

      </div>
    </div>
  );
};

export default Category;