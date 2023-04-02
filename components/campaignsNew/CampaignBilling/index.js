/** Author
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-03-31 16:11:03
 * @modify date 2023-04-02 16:54:37
 * @desc [description]
 */

//#region //* Imports
import PropTypes from "prop-types";
// * Mui Components
import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { blue, green, orange } from "@mui/material/colors";
// * Icons
import DetailsIcon from "@mui/icons-material/Details";
import AttachMoneySharpIcon from "@mui/icons-material/AttachMoneySharp"; // * Money
// * Local Components
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

const BillingCard = (props) => {
  //#region //* State & local variables
  const { record } = props;
  //#endregion

  //#region //* Event Handlers
  const handleBilling = () => {
    alert("Billing");
  };
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
              Billing Summary
            </Typography>
          </Grid>
          {/* //& Details Button */}
          <Grid
            item
            xs={1}
            sx={{
              display: "flex",
              justifyContent: "right",
            }}
          >
            {record.cost > 0 && (
              <ActionIconButton
                filled={true}
                color={orange[500]}
                tooltipText="Work with Billing Details"
                onClick={handleBilling}
              >
                <DetailsIcon sx={{ fontSize: 20 }} />
              </ActionIconButton>
            )}
          </Grid>
        </Box>

        {/* //^ Body */}
        <Box sx={{ mb: 3, display: "grid", alignItems: "center" }}>
          {record.cost <= 0 ? (
            <Typography variant="h1" 
            sx={{ 
              mt: 10,
              textAlign: "center",
              color: green[500]
            }}
              >
              Free
            </Typography>
          ) : (
            <Box
              sx={{
                mb: { xs: 2, md: 3 },
                display: "flex",
                alignItems: "center",
              }}
            >
              <AttachMoneySharpIcon
                sx={{
                  fontSize: 24,
                  color: (theme) => theme.palette.text.secondary,
                }}
              />
              <Box sx={{ ml: 3.5 }}>
                <Typography variant="h6">
                  {record.cost}  per session
                  </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </BackDrop>
    </>
  );
};

export default BillingCard;

BillingCard.propTypes = {
  record: PropTypes.object.isRequired,
};
