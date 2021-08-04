import React, { useState, useEffect } from 'react';

const Location = () => {
    // initial state, set state of movies array 
    const [suburbs, setSuburbs] = useState([]);
  
    // initial state, set state of search string 
    const [search, setSearch] = useState('');
  
    // calling API -- searchValue as a parameter 
    const searchPostcode = async (searchTerm) => {
      const url = `http://v0.postcodeapi.com.au/suburbs/${searchTerm}.json -H 'Accept: application/json; indent=4`;
  
      const response = await fetch(url); 
      const responseJson = await response.json(); 
  
      // API JSON -- results
      if (responseJson.results) {
        setSuburbs(responseJson.results); 
      }
    };
  
    // passes new searchValue to our getMovieRequest
    useEffect(() => {
      searchPostcode(search); 
    }, [search]); 
      
      return (
      <>
      <div>
        <form
                  name='search'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Enter your postcode'
                />
          <BabyLoc search={search} setSearch={setSearch} />
        </div>
          
          <div className='row'>
            <BabySuburbs suburbs={suburbs} />
          </div>
      </>
      );
  };
  
export default Location;