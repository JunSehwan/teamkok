import React, { useCallback,useState  } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchTerm } from 'slices/board';

const Search = () => {
  const dispatch = useDispatch();
  const { searchTerm } = useSelector(state => state.board);
  const [term,setTerm]=useState("");
  const setSearch = useCallback((e) => {
    e.preventDefault();
    setTerm(e.target.value)
  }, [])
  const onKeyDown = useCallback((e) => {
    // e.preventDefault();
    if(e.key === "Enter"){
      dispatch(setSearchTerm(term));
    // setSearch();
   }
  }, [dispatch, term])
  const onSearch = useCallback((e) => {
    e.preventDefault();
      dispatch(setSearchTerm(term));
      // setSearch();
  }, [dispatch, term])
  return (
    <div className="flex flex-col px-4 space-y-4 max-w-2xl mx-auto">

      <form className="flex items-center" onSubmit={onSearch} >
        <label htmlFor="search" className="sr-only">Search</label>
        <div className="relative w-full">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
          </div>
          <input
            type="text"
            id="search"
            className="transition-all bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
            placeholder="회사명 검색"
            value={term}
            onChange={setSearch}
            onKeyPress={onKeyDown}
             />

        </div>
        <button type="submit" className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-purple-700 rounded-lg border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
          <svg className="mr-1 ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>
      </form>

      <p className="mt-2 text-purple-800">궁금한 회사를 검색해보세요.
      </p>

    </div>
  );
};

export default Search;