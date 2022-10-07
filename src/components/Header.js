import React, { useState } from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse
} from 'mdb-react-ui-kit';

function Header() {
    //define state
    const [show, setShow] = useState(false);
  return (
    <div>
         <MDBNavbar expand='lg' light style={{ backgroundColor: "#4d4dff"}}>
        <MDBContainer fluid>
          <MDBNavbarBrand href="/">
            <img src="https://res.cloudinary.com/db15gy9h6/image/upload/v1665115076/TIM_S-removebg-preview_anmwdn.png" alt=""  style={{height: "50px"}}/>Tim's Sports Blog</MDBNavbarBrand>
          <MDBNavbarToggler
            type='button'
            style={{color: '#fff'}}
            data-target='#navbarColor02'
            aria-controls='navbarColor02'
            aria-expanded='false'
            aria-label='Toggle navigation'
        
            onClick={() => setShow(!show)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
          <MDBCollapse show={show} navbar>
            <MDBNavbarNav className='me-auto mb-2 mb-lg-0'>
              <MDBNavbarItem className='active'>
                <MDBNavbarLink aria-current='page' href='/' style={{color: '#ffff99'}}>
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/addBlog' style={{color: '	#ffff99'}}>Add Blog</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/about' style={{color: '	#ffff99'}}>About</MDBNavbarLink>
              </MDBNavbarItem>
              
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>

     
    </div>
  )
}

export default Header