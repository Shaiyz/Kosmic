import { NavLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import { Drawer } from '@material-ui/core'

import links from '../links'

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: '80%',
    margin: 'auto',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    height: 'auto',
    position: 'relative',
    top: '70px',
  },

  navbar: {
    display: 'flex',
    flexDirection: 'column',
    margin: '40px 10px',
    alignItems: 'center',
  },

  navItem: {
    width: '80%',
    margin: '10px 0px',
    padding: '2px 10px',
    color: 'white',
    textTransform: 'uppercase',
    fontSize: '12px',
    fontWeight: '600',
    letterSpacing: '1px',
    textDecoration: 'none',
    borderBottom: '1px dotted #5a5959',
    '&:hover': {
      color: '#555',
      backgroundColor: '#e7e7e7',
    },
  },

  activeNav: {
    color: '#555',
    backgroundColor: '#e7e7e7',
  },
}))

const Sidebar = (props) => {
  const classes = useStyles()
  const { open, onClose, variant, auth } = props

  return (
    <Drawer
      classes={{ paper: classes.drawer }}
      anchor='left'
      open={open}
      variant={variant}
      onClose={onClose}
    >
      {auth ? (
         <div className={classes.navbar}>
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
       </div>
      ): (
        <div className={classes.navbar}>
          <NavLink
            className={classes.navItem}
            to='/sign-in'
            activeClassName={classes.activeNav}
          >
            Sign In
          </NavLink>
      </div>
      )}
    </Drawer>
  )
}

export default Sidebar