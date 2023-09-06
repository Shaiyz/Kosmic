import { Box, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  userName: {
    color: theme.palette.primary.dark,
    fontSize: 22,
    fontWeight: 500,
  },
  subHead: {
    margin: 0,
    fontSize: 18,
    fontWeight: 550,
    width: "150px",

    [theme.breakpoints.down("sm")]: {
      width: 100,
    },
  },
  contactBox: {
    display: "flex",
    flexWrap: "wrap",
    padding: "8px 0",
    margin: "0px",
    borderBottom: `1px solid ${theme.palette.secondary.dark}`,
  },
}));

const Profile = () => {
  const classes = useStyles();
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <div>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">My Profile</Typography>
        </Box>
        <p>
          Welcome{" "}
          <span
            className={classes.userName}
          >{`${user.first_name}  ${user.last_name}`}</span>
          ,
        </p>
        <Typography variant="subtitle2" mb={5}>
          My Profile Dashboard
        </Typography>

        <div style={{ marginTop: "30px" }}>
          <Box className={classes.contactBox}>
            <h3 className={classes.subHead}>Email</h3>
            <p style={{ margin: 0 }}>{user.email}</p>
          </Box>
        </div>
      </div>
    </>
  );
};

export default Profile;
