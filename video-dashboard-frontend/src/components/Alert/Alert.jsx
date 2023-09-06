import {
  CheckCircleOutline,
  ErrorOutline,
  InfoOutlined,
  WarningOutlined,
} from '@material-ui/icons'
import { makeStyles } from '@material-ui/core'

const icons = {
  success: <CheckCircleOutline className='icon' />,
  error: <ErrorOutline className='icon' />,
  info: <InfoOutlined className='icon' />,
  warning: <WarningOutlined className='icon' />,
}

const useStyle = makeStyles({
  Alert: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '10px 0',
    borderRadius: 2,
    fontSize: '0.875rem',

    '& .icon': {
      margin: '0 10px',
    },
  },

  success: {
    backgroundColor: '#edf7ed',

    '& .icon': {
      color: '#5cb660',
    },
  },

  error: {
    backgroundColor: '#fdecea',

    '& .icon': {
      color: '#f55448',
    },
  },

  info: {
    backgroundColor: '#e8f4fd',

    '& .icon': {
      color: '#35a0f4',
    },
  },

  warning: {
    backgroundColor: '#fff4e5',

    '& .icon': {
      color: '#ffa117',
    },
  },
})
const Alert = ({ children, variant, ...props }) => {
  const classes = useStyle()
  const icon = icons[variant]
  const variantClass = classes[variant]
  return (
    <div className={`${classes.Alert} ${variantClass}`} {...props}>
      {icon} {children}
    </div>
  )
}

export default Alert
