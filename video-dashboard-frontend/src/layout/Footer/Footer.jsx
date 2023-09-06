import PropTypes from 'prop-types'
import { Typography, Link, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 15,
    padding: '5px 0',
    textAlign: 'center',
    position: 'absolute',
    width: '100%',
  },
}))

const Footer = (props) => {
  const { className, ...rest } = props

  const classes = useStyles()

  return (
    <div {...rest} className={`${classes.root} ${className ? className : ''}`}>
      <Typography variant='body2'>
        &copy;{' '}
        <Link component='a' target='_blank'>
          Demo Project
        </Link>
        . 2023
      </Typography>
      <Typography variant='caption'>
        Created with love for the environment.
      </Typography>
    </div>
  )
}

Footer.propTypes = {
  className: PropTypes.string,
}

export default Footer
