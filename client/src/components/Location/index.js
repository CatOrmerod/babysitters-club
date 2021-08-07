import React, { useState, useEffect } from 'react';
import { Form } from 'semantic-ui-react';

const Location = ({ handleChange, formState, setFormState }) => {
  // initial state, set state of suburbs array 
  const [suburbs, setSuburbs] = useState([]);

  // initial state, set state of search string 
  const [search, setSearch] = useState('');
  const updateLocation = (loc) => {
    console.log(loc)
    setFormState({
      ...formState,
      babysitterLoc: loc
    })
  }
  // calling API -- searchValue as a parameter 
  const searchPostcode = async (searchTerm) => {
    const url = `http://api.geonames.org/postalCodeSearchJSON?postalcode=${searchTerm}&maxRows=10&username=catormerod`;

    const response = await fetch(url);
    const responseJson = await response.json();
    // Make sure responseJson has the array and use that array for set suburbs
    // API JSON -- results
    if (responseJson) {
      setSuburbs(responseJson.postalCodes);
      if (responseJson.postalCodes.length>0) updateLocation(responseJson.postalCodes[0].placeName+', '+responseJson.postalCodes[0].postalCode);
    }
  };

  // passes new searchValue to our searchPostcode
  useEffect(() => {
    if (search)  searchPostcode(search);
  }, [search]);

  return (
    <>
      <Form.Field>
        
        <input
          name="babysitterLoc"
          placeholder="Enter your postcode"
          className="form-input w-100"
          style={{ lineHeight: '1.5', resize: 'vertical' }}
          onBlur={(e) => setSearch(e.target.value)}
          onChange={handleChange}
        />
      </Form.Field>
      {suburbs?.length ? <div>
        <select onChange={e => updateLocation(e.target.value)}>
          {suburbs.map(suburb => (
            <option value={suburb.placeName + ', ' + suburb.postalCode} >
              {suburb.placeName} {suburb.postalCode}
            </option>
          )
          )}
        </select>
      </div> : null}
    </>
  );
};

export default Location;