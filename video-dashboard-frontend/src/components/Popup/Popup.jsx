import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
  Typography,
  Button
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(5),
    position: 'absolute',
    top: theme.spacing(10),
  },
  dialogTitle: {
    paddingRight: '0px',
  },
}))

const Popup = (props) => {
  const { title, description, children, openPopup, setOpenPopup } = props
  const classes = useStyles()

  return (
    <Dialog
      open={openPopup}
      maxWidth='md'
      classes={{ paper: classes.dialogWrapper }}
    >
      <DialogTitle className={classes.dialogTitle}>
        <div style={{ display: 'flex' }}>
          <Typography variant='h6' component='div' style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Button
            onClick={() => {
              setOpenPopup(false)
            }}
          >
            <CloseIcon />
          </Button>
        </div>
        <div>
          <Typography
            variant='p'
            component='div'
            style={{ flexGrow: 1, opacity: 0.5 }}
          >
            {description}
          </Typography>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  )
}
export default Popup
