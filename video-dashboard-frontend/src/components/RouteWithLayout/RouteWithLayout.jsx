import { Route, Redirect } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
// import { global_actions } from "redux-store";
import PropTypes from 'prop-types'

const RouteWithLayout = (props) => {
  //   const dispatch = useDispatch()
  const {
    // layout: Layout,
    component: Component,
    componentProps,
    requireAuthentication,
    authenticated,
    ...rest
  } = props
  return (
    <Route
      {...rest}
      render={(matchProps) => {
        const compProps = { ...matchProps, ...componentProps }
        return requireAuthentication ? (
          authenticated ? (
            <Component {...compProps} />
          ) : (
            <>
              <Redirect to='/login' />
            </>
          )
        ) : (
          <Component {...compProps} />
        )
      }}
    />
  )
}

RouteWithLayout.defaultProps = {
  componentProps: {},
}

RouteWithLayout.propTypes = {
  component: PropTypes.node.isRequired,
  componentProps: PropTypes.any,
  //   layout: PropTypes.node.isRequired,
  path: PropTypes.string,
  requireAuthentication: PropTypes.bool,
  authenticated: PropTypes.bool,
}

export default RouteWithLayout
