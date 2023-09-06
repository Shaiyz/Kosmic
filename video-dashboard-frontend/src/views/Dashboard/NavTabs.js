import {
  Person,
  PersonOutline
} from '@material-ui/icons'
const tabs = [
  {
    name: 'Profile',
    panel: 0,
    icon: <PersonOutline />,
    activeIcon: <Person />,
  } ,{
    name: "Collaborators",
    panel: 1,
    icon: <PersonOutline />,
    activeIcon: <Person />,
  },
]

export default tabs
