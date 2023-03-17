/** Author
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-03-02 12:05:52
 * @modify date 2023-03-17 11:46:01
 * @desc [description]
 */

//#region //* Imports
import PropTypes from "prop-types";
// * Icons
import { BiTargetLock } from "react-icons/bi";
import { GiPistolGun } from "react-icons/gi";
import { MdCampaign } from "react-icons/md";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
// * Local Components
import ActionIconButton from "components/controls/ActionIconButton";
//#endregion


const CampaignTypeIcon = (props) => {
  //#region //* State & local variables
  const { type, size } = props;
  //#endregion
  
  //#region //* Event Handlers
  const typeText = (type) => {
    switch (type) {
      case "o":
        return (
          <ActionIconButton
            filled={true}
            color="darkgoldenrod"
            tooltipText="One-Shot"
          >
            <BiTargetLock size={size}/>
          </ActionIconButton>
        ); // One-Shot
      case "a":
        return (
          <ActionIconButton
            filled={true}
            color="purple"
            tooltipText="Adventure: multiple sessions"
          >
            <GiPistolGun size={size}/>
          </ActionIconButton>
        ); // Adv
      case "c":
        return (
          <ActionIconButton
            filled={true}
            color="darkred"
            tooltipText="Campaign: a 'Zero to Hero' approach"
          >
            <MdCampaign size={size}/>
          </ActionIconButton>
        ); // Cmgn

      default:
        return (
          <ActionIconButton
            filled={true}
            color="grey"
            tooltipText="Unknown Campaign Type"
          >
            <QuestionMarkIcon size={size}/>
          </ActionIconButton>
        );
    }
  };
  //#endregion

  return (<>{typeText(type)}</>);
};

export default CampaignTypeIcon;

CampaignTypeIcon.defaultProps = {
  type: "",
  size: "",
}

CampaignTypeIcon.propTypes = {
  type: PropTypes.string,
  size: PropTypes.string,
};
