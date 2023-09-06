import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  IconButton,
  Container,
  Typography,
  makeStyles,
  Box,
  Avatar,
} from "@material-ui/core";
// import ArrowCircleLeftRoundedIcon from '@material-ui/icons';
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import { Add } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { collaboratorActions } from "../../redux-store";
import { collaboratorAddFormData } from "../Dashboard/Collaborators/formData";
import DialogForm from "../../components/DialogForm/DialogForm";
const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(5),
  },

  avatarContainer: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    border: `2px solid ${theme.palette.background.paper}`,
    marginLeft: theme.spacing(-1.5), // Overlap avatars
    "&:first-child": {
      marginLeft: 0, // Remove overlap for the first avatar
    },
  },
  image: {
    width: "100%",
    maxHeight: "30%",
    borderRadius: "20px",
  },

  content: {
    display: "flex",
    flexDirection: "column",
  },
  outerContainer: {
    display: "flex",
    padding: theme.spacing(2),
  },
  backButton: {
    margin: theme.spacing(1),
    fontSize: "5rem", // Increase the icon size here
  },
}));

function DetailPage() {
  const classes = useStyles();
  const { videos } = useSelector((state) => state.videos);
  const { collaborators } = useSelector((state) => state.collaborators);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [video, setVideo] = useState(null);
  const { user } = useSelector((state) => state.auth);

  const openDialog = () => {
    setOpenAddDialog(true);
  };
  useEffect(() => {
    dispatch(collaboratorActions.fetchCollaborators());
    const data = videos.find((item) => item._id === id);
    setVideo(data);
  }, [dispatch]);
  const addCollaborator = (formState) => {
    let val = {
      name: formState.name.value,
      role: formState.role.value,
      profilePicture: formState.profilePicture.value,
      createdBy: user._id,
    };
    dispatch(collaboratorActions.addCollaborator(val));
  };

  return (
    <Container className={classes.container}>
      <Box className={classes.outerContainer}>
        <Link to="/videos">
          <IconButton className={classes.backButton}>
            <ArrowBackIosRoundedIcon />
          </IconButton>
        </Link>

        <Box className={classes.content}>
          <Typography variant="h6">{video?.title}</Typography>
          <Typography variant="body1">
            {new Date(video?.createdAt).toDateString()}
          </Typography>
        </Box>
      </Box>

      <img src={video?.thumbnail} alt="Image" className={classes.image} />
      <Box className={classes.outerContainer}>
        <Typography variant="h5">Collaborators:</Typography>
        <div className={classes.avatarContainer}>
          {collaborators?.length &&
            collaborators.map((avatar, index) => (
              <Avatar
                key={index}
                alt={avatar.name}
                src={avatar.profilePicture}
                className={classes.avatar}
              />
            ))}
        </div>
        <IconButton onClick={() => openDialog()}>
          <Add  /> Add new
        </IconButton>
      </Box>
      <DialogForm
        open={openAddDialog}
        onClose={() => {
          setOpenAddDialog(false);
        }}
        formData={null}
        formConfig={collaboratorAddFormData}
        onSubmit={(formState) => addCollaborator(formState)}
        title={"Add Collaborator"}
      />
    </Container>
  );
}

export default DetailPage;
