import React from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'
import AddPost from './AddPost'

const NavBar = (props) => {
  const {categories, makePost, showAddModal, openAddModal, closeAddModal} = props
  return (
    <div>
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            Readable
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem href="/">
              Home
          </NavItem>
          <NavDropdown title="Categories" id="basic-nav-dropdown">
            {categories.map((cat)=>
                <MenuItem href={('/'+cat.toLowerCase())} key={cat}>{cat}</MenuItem>
            )}
          </NavDropdown>
        </Nav>
        <Nav pullRight>
          <NavItem onClick={openAddModal}>Add a Post</NavItem>
        </Nav>
      </Navbar>
      <AddPost showAddModal={showAddModal}
        closeAddModal={closeAddModal}
        onSubmit={makePost}
        categories={categories}
      />
    </div>
  )
}

export default NavBar
