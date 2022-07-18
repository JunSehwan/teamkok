import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import CategoryList from 'components/Common/CatgegoryList';
import PropTypes from 'prop-types';

const Category = ({ user, checkedCategory, setCheckedCategory }
) => {
  const { category } = useSelector(state => state.category);
  const handleCategoryChange = useCallback((e) => {
    setCheckedCategory(e.target.value);
    console.log("checkd", checkedCategory);
  }, [checkedCategory]);

  const [toggleDrop, setToggleDrop] = useState(false);
  const toggleDropdown = useCallback(() => {
    setToggleDrop(prev => !prev);
  }, [toggleDrop])

  return (
    <div className="text-base-100">
      <div className="gap-x-2 items-center mb-10 carousel">
        <ul className="w-48 text-sm font-medium text-gray-900 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <button onClick={toggleDropdown} id="dropdownHelperRadioButton" className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-2 py-1.5 text-center inline-flex items-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800" type="button">
            직무카테고리
            <svg className="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7">
              </path></svg>
          </button>
          {toggleDrop ?
            <div id="dropdownHelperRadio" className="">
              {category &&
                category?.map((m, i) => (
                  <li key={m?.key} className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                    <div className="flex items-center pl-3">

                      <input
                        type="radio"
                        defaultChecked={m?.key === user?.category}
                        id="category"
                        name="category"
                        value={m?.key}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        // checked={m?.key === user?.category ? checked : null}
                        onChange={(e) => handleCategoryChange(e)}
                      />
                      <label htmlFor="category" className="py-2 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">
                        {m?.name}
                      </label>
                      {m?.key === checkedCategory &&
                        <div className="text-white w-[90px] bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-[0.75rem] px-1 py-0.5 text-center">선택값</div>}

                    </div>
                  </li>
                ))}
            </div>
            : null}
        </ul>

      </div>
    </div>
  );
};

Category.propTypes = {
  user: PropTypes.object,
  checkedCategory: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setCheckedCategory: PropTypes.func,
  handleCategoryChange: PropTypes.func,
};

export default Category;