import React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

const CampaignHeader = (props) => {
  const theme = useTheme();
  const { title, handleClear } = props;
  return (
    <>
      {/* <Box> */}
      <Paper
        sx={{
          padding: theme.spacing(5),
          borderRadius: "15px",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Grid container>
          <Grid item xs={6} >
            <Typography variant="h2">{title}</Typography>
          </Grid>
          <Grid item xs={6} sx={{display: "grid"}}>
            <Button 
              variant="contained" 
              sx={{ justifySelf: "self-end" }}
              onClick={handleClear}
              color="secondary"
              >
              Clear
            </Button>
          </Grid>
        </Grid>
      </Paper>
      {/* </Box> */}
    </>
  );
};

export default CampaignHeader;
