/** Author
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-03-02 12:05:52
 * @modify date 2023-03-03 11:24:55
 * @desc [description]
 */

//#region //* Imports
import PropTypes from "prop-types";
// * Mui Components
import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
// * Icons
import AddIcon from "@mui/icons-material/Add";
// * Local Components
import AppGrid from "lib/components/AppGrid";
import ActionIconButton from "components/controls/ActionIconButton";
// * Services
//#endregion

//#region //* Styles
const BackDrop = styled(Paper)(({ theme }) => ({
  width: "100%",
  height: "100%",
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: 10,
}));
//#endregion

const CampaignPlayersList = (props) => {
  //#region //* State & local variables
  const { record } = props;
  const theme = useTheme();
  //#endregion

  //#region //* Hooks
  //#endregion

  //#region //* Event Handlers
  const handleAddPlayer = () => {
    alert("Add Player");
  };
  //#endregion

  return (
    <BackDrop>
      <Box
        sx={{
          mt: 1,
          mb: 3,
          px: 3,
          pb: 2,
          flex: 1,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Grid item xs={11}>
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            Players
          </Typography>
        </Grid>
        <Grid item xs={1} sx={{
          display: "flex",
          justifyContent: "right",
        }}>
          <ActionIconButton
            filled={true}
            color={theme.palette.secondary.main}
            tooltipText="Add Player"
            onClick={handleAddPlayer}

          >
            <AddIcon sx={{ fontSize: 20}} />
          </ActionIconButton>
        </Grid>
      </Box>
      <Box
        sx={{
          mb: 3,
        }}
      >
        <Typography variant="body">Player cards</Typography>
      </Box>
    </BackDrop>
  );
};

export default CampaignPlayersList;

CampaignPlayersList.propTypes = {
  record: PropTypes.object.isRequired,
};
