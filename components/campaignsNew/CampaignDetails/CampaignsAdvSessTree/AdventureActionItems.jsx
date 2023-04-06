import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Box from "@mui/material/Box";
import { alpha } from "@mui/material";
import { styled } from "@mui/material/styles";
import Controls from "components/controls/Controls";

//#region // * Styling
const ActionHoverWrapper = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    right: -30,
    top: "50%",
    zIndex: 1,
    transform: "translateY(-50%)",
    transition: "all 0.4s ease",
    opacity: 0,
    visibility: "hidden",
    cursor: "pointer",
  };
});
//#endregion

const AdventureActionItemMenu = (props) => {
  const { record, handleEdit, handleDelete, handleView} = props;

  return (
      <Box
        component="span"
        sx={{
          display: "flex",
          alignItems: "center",
          marginLeft: "auto",
          position: "relative",
        }}
      >
        <span className="conActionHoverHideRoot">
          <IconButton
            sx={{
              color: (theme) => theme.palette.text.disabled,
              padding: 2,
              "& .MuiSvgIcon-root": {
                fontSize: 18,
              },
            }}
            size="large"
          >
            <MoreVertIcon />
          </IconButton>
        </span>

        <ActionHoverWrapper className="conActionHoverRoot">
          {/* //& Delete Item */}
          {handleDelete && <Controls.ActionButton
            filled={true}
            color="red"
            tooltipText={"Delete an Adventure"}
            size="small"
            onClick={() => handleDelete(record)}
          >
            <DeleteOutlinedIcon fontSize="small" />
          </Controls.ActionButton>}
          {/* //& View Item */}
          {handleView && <Controls.ActionButton
            filled={true}
            color="darkblue"
            tooltipText={"View an Adventure"}
            size="small"
            onClick={() => handleView(record)}
          >
            <VisibilityIcon fontSize="small" />
          </Controls.ActionButton>}
          {/* //& Edit Item */}
          {handleEdit && <Controls.ActionButton
            filled={true}
            color="darkcyan"
            tooltipText={"Edit an Adventure"}
            size="small"
            onClick={() => handleEdit(record)}
          >
            <EditOutlinedIcon fontSize="small" />
          </Controls.ActionButton>}
        </ActionHoverWrapper>
      </Box>
  );
};

export default AdventureActionItemMenu;

AdventureActionItemMenu.propTypes = {
  record: PropTypes.object.isRequired,
  handleDelete: PropTypes.func,
  handleEdit: PropTypes.func,
  handleView: PropTypes.func,
};
