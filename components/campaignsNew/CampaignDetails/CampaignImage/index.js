/** Author
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-03-01 10:49:59
 * @modify date 2023-03-17 11:58:52
 * @desc [description]
 */
//#region // *Imports
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import { styled } from "@mui/material/styles";
import AppCard from "@/../../lib/components/AppCard";
// import { Fonts } from "@/../../lib/constants/AppEnums";
//#endregion

//#region //* Styles

//#endregion

const CampaignImage = (props) => {
  const { record } = props;
  console.log("CampaignImage -> record", record)
  
  return (
    <AppCard
      sxStyle={{ mb: 8 }}
      contentStyle={{
        p: 0,
        "&:last-of-type": {
          pb: 0,
        },
      }}
    >
      <CardMedia
        sx={{
          height: 180,
          width: "100%",
        }}
        image={record.imageUrl || "/assets/images/1444575.gif"}
        alt={record.name}
      />
    </AppCard>
  );
};

export default CampaignImage;

CampaignImage.propTypes = {
   record: PropTypes.object.isRequired,
};
