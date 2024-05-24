// import { useState, useEffect, createContext } from 'react';
// import PropTypes from 'prop-types';
// import { getSearchResults } from '../services/AppServices';

// const SearchContext = createContext();

// export const SearchProvider = ({ children }) => {
//   const [results, setResults] = useState(null);

//   const fetchSearchResults = async (searchKey) => {
//     try {
//       const searchResults = await getSearchResults(searchKey);
//       // return searchResults
//       setResults(searchResults);
//     } catch (error) {
//       console.error("Error during search:", error);
//     }
//   }

//   return (
//     <SearchContext.Provider value={{
//       results,
//       fetchSearchResults,
//       }}
//       >
//       {children}
//     </SearchContext.Provider>
//   );
// };
// export default SearchContext;

// SearchProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };
