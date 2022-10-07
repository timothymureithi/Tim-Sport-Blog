import { MDBCard, MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';
import React from 'react';

function Category({handleCategory, options}) {
  return (
<MDBCard style={{width: "18rem", marginTop: "20px"}}>
  <h4>Leagues</h4>
  <MDBListGroup flush >
    {options.map((item, index) => (
      <MDBListGroupItem 
      key={index} 
      style={{cursor:"pointer"}}
      onClick={() => handleCategory(item)}>
      {item}
      </MDBListGroupItem>
    
    ))}
  </MDBListGroup>

</MDBCard>

    );
};

export default Category;