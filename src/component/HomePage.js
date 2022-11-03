import React from 'react';
import {Grid, Typography} from "@mui/material";

const HomePage = ({userData}) => {
  return (
    <Grid container spacing={2}>
      <Grid item>
        <Typography variant="h6" sx={{color:"blue"}}>HomePage</Typography>
      </Grid>

      <Grid item>
        <Typography>{`${userData.firstName}-${userData.lastName}`}</Typography>
      </Grid>
    </Grid>
  )
}

export default HomePage;
