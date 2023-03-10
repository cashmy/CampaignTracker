import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ActionButton from "./ActionButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Box from "@mui/material/Box";
import { alpha } from "@mui/material";
import { styled } from "@mui/material/styles";

const ListItemWrapper = styled(ListItem)(({ theme }) => {
  return {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 0,
    paddingBottom: 0,
    cursor: "pointer",
    overflow: "hidden",
    "&.rootCheck": {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      boxShadow: `0 3px 5px 0 ${alpha(theme.palette.common.black, 0.08)}`,
    },
    "& .actionHoverHideRoot": {
      transition: "all 0.4s ease",
    },
    "&:hover": {
      "& .actionHoverRoot": {
        opacity: 1,
        visibility: "visible",
        right: 0,
      },
      "& .actionHoverHideRoot": {
        opacity: 0,
        visibility: "hidden",
      },
    },
  };
});

const ActionHoverWrapper = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    right: -30,
    top: "50%",
    zIndex: 2000,
    transform: "translateY(-20%)",
    transition: "all 0.4s ease",
    opacity: 0,
    visibility: "hidden",
    cursor: "pointer",
  };
});

const ActionItemMenu = (props) => {
  const { record, handleEdit, handleDelete } = props;

  return (
    <ListItemWrapper>
      <Box
        component="span"
        sx={{
          display: "flex",
          alignItems: "center",
          marginLeft: "auto",
          position: "relative",
        }}
      >
        <span className="actionHoverHideRoot">
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

        <ActionHoverWrapper className="actionHoverRoot">
          {/* //& Edit Item */}
          <ActionButton
            filled={true}
            color="darkcyan"
            tooltipText={"Edit an item"}
            size="small"
            onClick={() => handleEdit(record)}
          >
            <EditOutlinedIcon fontSize="small" />
          </ActionButton>
          {/* //& Delete Item */}
          <ActionButton
            filled={true}
            color="red"
            tooltipText={"Delete an item"}
            size="small"
            onClick={() => handleDelete(record.id)}
          >
            <DeleteOutlinedIcon fontSize="small" />
          </ActionButton>
        </ActionHoverWrapper>
      </Box>
    </ListItemWrapper>
  );
};

export default ActionItemMenu;

ActionItemMenu.propTypes = {
  record: PropTypes.object.isRequired,
  handleDelete: PropTypes.func,
  handleEdit: PropTypes.func,
};
