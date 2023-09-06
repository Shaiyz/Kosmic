import React, { useEffect } from "react";
import {
  Container,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { videorActions } from "../../redux-store";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../../components/Alert/Alert";
import ClipLoader from 'react-spinners/ClipLoader'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f0f0f0",
    borderRadius: "10px",
    padding: theme.spacing(2),
  },
  card: {
    marginBottom: theme.spacing(6),
    height: "100%",
    borderRadius: "15px",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",

    justifyContent: "space-between",
    padding: theme.spacing(1), // Add padding to the card content
    
  },
  noUnderline: {
    textDecoration: 'none',
  },
  image: {
    borderRadius: "22.5px",
    padding: theme.spacing(0.5), // Add padding to the card content
    width: "97.5%",
    height: "70%",
    objectFit: "cover",
  },

}));

function Videos() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const { videos, loading, error } = useSelector((state) => state.videos)

  useEffect(() => {
    dispatch(videorActions.fetchVideos())
  }, [dispatch])
  
  return (
    <Container className={classes.root}>
       {loading ? (
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            marginTop: 70,
          }}
        >
          <ClipLoader color={'#000000'} loading={loading} size={40} />
        </div>
      ) : error ? (
        <Alert variant='error'>{error}</Alert>
      ) : (
      <Grid container spacing={2}>
        {videos?.map((data, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Link to={`/video/${data._id}`} className={classes.noUnderline}>
              <Card className={classes.card}>
                <img
                  src={data.thumbnail}
                  alt={data.title}
                  className={classes.image}
                />
                <CardContent className={classes.cardContent}>
                  <Typography variant="h6" gutterBottom  >
                    {data.title}
                  </Typography>
                  <Typography variant="caption" >
                    Created on {new Date(data.createdAt).toDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid> 
      )}
    </Container>
  );
}

export default Videos;
