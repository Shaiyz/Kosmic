import {
  TextField,
  Select,
  withStyles
} from '@material-ui/core'
import ClipLoader from 'react-spinners/ClipLoader'
import { Check } from '@material-ui/icons'


const CssTextField = withStyles((theme) => ({
  root: {
    '& .MuiFormLabel-root': {
      color: 'black',
      textTransform: 'uppercase',
      fontSize: '14px',

      '&:hover': {
        color: theme.palette.primary.main,
      },
    },

    '& label.Mui-focused': {
      color: theme.palette.primary.main,
    },

    '& .MuiInput-underline:after': {
      borderBottomColor: theme.palette.primary.main,
    },

    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black',
        borderRadius: '1px',
      },
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
      },
    },
    margin: '10px 0',
  },
}))(TextField)

const Formfeild = (props) => {
  var field = null
  switch (props.elementType) {
    default:
      field = (
        <CssTextField
          variant='outlined'
          fullWidth
          inputProps={{ ...props.elementConfig }}
          value={props.value}
          label={props.label}
          InputLabelProps={{ shrink: true }}
          required={props.required}
          disabled={props.disabled}
          error={props.invalid}
          helperText={props.invalid ? props.invalidMessage : ''}
          onChange={props.valueChanged}
        />
      )
      break
    case 'input':
      if (props.elementConfig.type === 'file') {
       
          // image upload
          field = (
            <div>
              {props.isFileUploading ? (
                // <CircularProgress size={30} />
                <ClipLoader
                  color={'#000000'}
                  loading={props.isFileUploading}
                  size={40}
                />
              ) : (
                <small style={{ wordBreak: 'break-word' }}>
                  {props.value && <Check />}
                </small>
              )}
              <CssTextField
                variant='outlined'
                fullWidth
                inputProps={{ ...props.elementConfig }}
                label={props.label}
                InputLabelProps={{ shrink: true }}
                required={props.required}
                disabled={props.disabled}
                error={props.invalid}
                helperText={props.invalid ? props.invalidMessage : ''}
                onChange={props.valueChanged}
              />{' '}
            </div>
          )
        }else {
          field = (
            <CssTextField
              variant='outlined'
              fullWidth
              inputProps={{ ...props.elementConfig }}
              InputLabelProps={{ shrink: true }}
              label={props.label}
              value={props.value}
              required={props.required}
              disabled={props.disabled}
              error={props.invalid}
              helperText={props.invalid ? props.invalidMessage : ''}
              onChange={props.valueChanged}
            />
          )
        }
   
      break
    case 'textarea':
      field = (
        <CssTextField
          InputLabelProps={{ shrink: true }}
          variant='outlined'
          multiline
          fullWidth
          inputProps={{ ...props.elementConfig }}
          value={props.value}
          label={props.label}
          required={props.required}
          error={props.invalid}
          helperText={props.invalid ? props.invalidMessage : ''}
          onChange={props.valueChanged}
        />
      )
      break
    case 'select':
  
        field = (
          <Select
            variant='outlined'
            fullWidth
            native={true}
            inputProps={{ ...props.elementConfig }}
            value={props.value}
            label={props.label}
            required={props.required}
            error={props.invalid}
            helpertext={props.invalid ? props.invalidMessage : ''}
            onChange={props.valueChanged}
          >
            {Object.keys(props.options).map((key) => (
              <option key={key} value={props.options[key]}>
                {key}
              </option>
            ))}
          </Select>
        )
      
      break
  }

  return field
}

export default Formfeild
