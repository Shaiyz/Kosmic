import { Tabs, Tab, Box, makeStyles } from '@material-ui/core'

const useStyle = makeStyles((theme) => ({
  tab: {
    backgroundColor: theme.palette.black,
    textTransform: 'capitalize',

    [theme.breakpoints.up('sm')]: {
      minWidth: '100px',
    },
  },

  selectedTab: {
    color: theme.palette.text.secondary,
    backgroundColor: '#333333',
    '&:hover': {
      backgroundColor: '#333333',
    },
  },
}))

function TabContent(props) {
  const { children, value, index, ...other } = props

  return (
    <div role='tabpanel' hidden={value !== index} {...other}>
      {value === index && <Box py={3}>{children}</Box>}
    </div>
  )
}

const TabsPanel = ({ data, value, handleChange }) => {
  const classes = useStyle()

  const tabsNav = Object.keys(data).map((k, i) => (
    <Tab
      key={i}
      classes={{
        root: classes.tab,
        selected: classes.selectedTab,
      }}
      label={data[k].label}
    />
  ))

  const tabPanels = Object.keys(data).map((k, i) => (
    <TabContent value={value} index={i} key={i}>
      {data[k].content}
    </TabContent>
  ))

  return (
    <>
      <Tabs value={value} onChange={handleChange} indicatorColor='white'>
        {tabsNav}
      </Tabs>
      {tabPanels}
    </>
  )
}

export default TabsPanel
