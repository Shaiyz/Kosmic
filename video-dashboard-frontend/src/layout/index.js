import { useState } from 'react'
import { Hidden } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { authActions } from '../redux-store'

import Navbar from './Navbar/Navbar'
import Sidebar from './Sidebar/Sidebar'
import Footer from './Footer/Footer'

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [openSidebar, setOpenSidebar] = useState(false)

  const toggleMobileNav = () => {
    setOpenSidebar((prev) => !prev)
  }

  return (
    <>
      <Navbar
        toggleMobileNav={toggleMobileNav}
        auth={Boolean(user)}
        logout={() => dispatch(authActions.logout())}
      />
      <Hidden only={['lg', 'xl']}>
        <Sidebar
          open={openSidebar}
          onClose={toggleMobileNav}
          variant='temporary'
          auth={Boolean(user)}
        />
      </Hidden>
      <main style={{ marginTop: 80, minHeight: '80vh' }}>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
