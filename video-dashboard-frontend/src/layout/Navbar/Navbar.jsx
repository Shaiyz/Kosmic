import { NavLink } from 'react-router-dom'
import {
  AppBar,
  makeStyles,
  Toolbar,
  Hidden,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container,
  Avatar,
} from '@material-ui/core'
import { Menu as MenuIcon } from '@material-ui/icons'

import links from '../links'
import { useState } from 'react'
import DialogForm from '../../components/DialogForm/DialogForm'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  header: {
    width: '100%',
    backgroundColor: '#fff',
    border: 'none',
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    zIndex: 1200,
  },

  headerContainer: {
    width: '60%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '30px',
  },

  navItem: {
    margin: '0 10px',
    padding: '0 2px',
    color: '#333333',
    textTransform: 'uppercase',
    fontSize: '12px',
    fontWeight: '600',
    letterSpacing: '1px',
    textDecoration: 'none',
    '&:hover': {
      color: '#555',
      backgroundColor: '#e7e7e7',
    },
  },
  subHead: {
    margin: 0,
    fontSize: 18,
    fontWeight: 550,
    width: "150px",
    color: '#333333',

    [theme.breakpoints.down("sm")]: {
      width: 100,
    },
  },
  activeNav: {
    color: '#555',
    backgroundColor: '#e7e7e7',
  },

  menuBtn: {
    color: 'white',
  },

  iconBtn: {
    color: 'white',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },

  title: {
    color: '#333333',
    [theme.breakpoints.down('sm')]: {
      flexGrow: 1,
    },
  },
}))

const Navbar = ({ toggleMobileNav, auth, logout }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const [openLogout, setOpenLogout] = useState(false)
  const open = Boolean(anchorEl)
  const { user } = useSelector((state) => state.auth)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <AppBar className={classes.header}>
        <Hidden only={['md', 'lg', 'xl']}>
          <IconButton className={classes.menuBtn} onClick={toggleMobileNav}>
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Typography variant='subtitle1' className={classes.title}>
          {user &&  `Hi , ${user.first_name}`}
        </Typography>
        {auth ? (
          <>
            <Hidden only={['xs', 'sm']}>
              <Toolbar className={classes.headerContainer}>
                <nav className={classes.navbar}>
                  {links.map((item, i) => (
                    <NavLink
                      className={classes.navItem}
                      to={item.path}
                      activeClassName={classes.activeNav}
                      key={i}
                    >
                      {item.title}
                    </NavLink>
                  ))}
                </nav>
              </Toolbar>
            </Hidden>
            <div>
            <span
            className={classes.subHead}
          >{`${user.email}`}</span>
              <IconButton
                onClick={open ? handleClose : handleMenu}
                color='inherit'
              >
                <Avatar src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60'></Avatar>
              </IconButton>
              <Menu
                style={{ top: 40 }}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    handleClose()
                    logout()
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </div>
          </>
        ) : (
          <nav className={classes.navbar}>
            <NavLink
              className={classes.navItem}
              to='/'
              activeClassName={classes.activeNav}
            >
              Sign In
            </NavLink>
          </nav>
        )}
      </AppBar>
      <Container>
        <DialogForm>
          open={openLogout!==false}
          onClose={() => setOpenLogout(false)}
          title={`Are you sure?`}
          onSubmit=
          {() => {
            logout()
          }}
        </DialogForm>
      </Container>
    </>
  )
}

export default Navbar
