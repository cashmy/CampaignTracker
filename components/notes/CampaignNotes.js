/**
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-03-31 16:11:03
 * @modify date 2023-04-01 16:00:49
 * @desc [description]
 */

//#region //* Imports
import PropTypes from "prop-types";
// * Mui Components
import { Box, Grid, Paper, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { blue, green } from "@mui/material/colors";
// * Icons
import AddIcon from "@mui/icons-material/Add";
import NotesIcon from '@mui/icons-material/Notes';
// * Local Components
import ActionIconButton from "components/controls/ActionIconButton";
import AppScrollbar from "lib/components/AppScrollbar";
// * Services
//#endregion

//#region //* Styles
const BackDrop = styled(Paper)(({ theme }) => ({
  width: "100%",
  height: "100%",
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  borderRadius: 10,
}));
//#endregion

const CampaignNotes = (props) => {
  //#region //* State & local variables
  const { record } = props;
  const theme = useTheme();
  //#endregion

  //#region //* Event Handlers
  const handleAdd = () => {
    alert("Add");
  }
  const handleEdit = () => {
    alert("Edit");
  }
  //#endregion

  return (
    <>
      <BackDrop>
        {/* //^ Header */}
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
          {/* //& Title */}
          <Grid item xs={12}>
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              Notes/Todo's
            </Typography>
          </Grid>

          {/* //& Add Button */}
          <Grid
            item
            xs={1}
            sx={{
              display: "flex",
              justifyContent: "right",
            }}
          >
            <ActionIconButton
              filled={true}
              color={theme.palette.secondary.main}
              tooltipText="Add Player"
              onClick={handleAdd}
            >
              <AddIcon sx={{ fontSize: 20 }} />
            </ActionIconButton>
          </Grid>
        </Box>

        {/* //^ Body */}
        <Grid container sx={{ mb: 3 }}>
          {/* //& Campaign Notes (scrollable) */}
          <Grid item xs={2} sx={{ textAlign: "center", mt: 12 }}>
            <NotesIcon
              sx={{
                fontSize: 24,
                color: (theme) => theme.palette.text.secondary,
              }}
            />

          </Grid>
          <Grid
            item
            xs={9}
            sx={{
              mt: 2, mb: 3,
              p: 3,
              minHeight: 110,
              maxHeight: 110,
              borderColor: "grey !important",
              borderRadius: 3,
              border: 1,
            }}
          >
            <AppScrollbar>
              <Typography>{record?.description}</Typography>
            </AppScrollbar>
          </Grid>

        </Grid>
      </BackDrop>
    </>
  );
};

export default CampaignNotes;

CampaignNotes.propTypes = {
  record: PropTypes.object.isRequired,
};
