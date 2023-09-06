import { useState } from 'react'
import {
  Button,
  Hidden,
  makeStyles,
  Grid,
  Collapse,
  Typography,
  ButtonGroup,
  Container
} from '@material-ui/core'
import { Menu, ExpandLess, ExpandMore } from '@material-ui/icons'
import Navtabs from './NavTabs'
import Profile from './Profile/Profile'
import Collaborators from './Collaborators/Collaborators'

const useStyles = makeStyles((theme) => ({
  tabs: {
    marginTop: '30px',
  },
  tabBtn: {
    color: 'black',
    display: 'flex',
    justifyContent: 'flex-start',
    textAlign: 'left',
    padding: '10px',
    fontWeight: 500,
    fontSize: 14,

    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
    },
  },
  activeTabBtn: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },

  notificationBadge: {
    width: 14,
    height: 14,
    borderRadius: '50%',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.white,
    marginTop: 5,
    marginLeft: 70,
    textAlign: 'center',
    lineHeight: '20px',
  },

  subscreen: {
    border: '1px solid black',
    borderRadius: 10,
    padding: 15,
    marginTop: 25,
  },
}))

function Dashboard() {
  const [openTab, setOpenTab] = useState(false)
  const [tabPanelIndex, setTabPanelIndex] = useState(0)
  const classes = useStyles()
  
  const toggleTabView = () => {
    setOpenTab((prev) => !prev)
  }
  
  const tabs = (
    <div className={classes.tabs}>
      <ButtonGroup orientation='vertical' fullWidth>
        {Navtabs.map((tab, index) => (
          <Button
            startIcon={tab.panel === tabPanelIndex ? tab.activeIcon : tab.icon}
            key={index}
            className={
              tab.panel === tabPanelIndex
                ? `${classes.activeTabBtn} ${classes.tabBtn}`
                : classes.tabBtn
            }
            onClick={() => {
              setTabPanelIndex(tab.panel)
              toggleTabView()
            }}
            align='left'
            fullWidth
          >

            {tab.name}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  )

  return (
    <Container maxWidth='lg'>
      <Hidden only={['lg', 'xl', 'md']}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          onClick={toggleTabView}
        >
          <Typography variant='h6'>
            <Menu />
            Menu
          </Typography>
          {openTab ? <ExpandLess /> : <ExpandMore />}
        </div>
        <Collapse in={openTab} timeout='auto' unmountOnExit>
          {tabs}
        </Collapse>
      </Hidden>
      <Grid container spacing={4}>
        <Grid item xs={12} md={3} lg={3}>
          <Hidden only={['sm', 'xs']}>{tabs}</Hidden>
        </Grid>
        <Grid item xs={12} md={9} lg={9}>
          <div className={classes.subscreen}>
            {tabPanelIndex === 0 && <Profile />}
            {tabPanelIndex === 1 && <Collaborators />}

          </div>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Dashboard
