/**
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-03-06 15:07:21
 * @modify date 2023-03-11 11:05:03
 * @desc [description]
 */

//#region //* Imports
import { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
// * Mui Components
import { Avatar, Box, Grid, Tooltip, Typography } from "@mui/material";
import { useForm, Form } from "@/../../lib/hooks/useForm";
import { FaDiscord } from "react-icons/fa"; // * Discord Icon
// * Local Components
import SelectPlayer from "components/players/SelectPlayer";
import Controls from "components/controls/Controls";
import { playerCampaignRecord as initialFValues } from "dataModels/playerCampaign";
// * Services
import PlayerService from "services/player.service";
import { set } from "lodash";
//#endregion

const CampaignPlayerDialog = (props) => {
  //#region //* State & local variables
  const { addOrEdit, recordForEdit } = props;
  const [records, setRecords] = useState([]);
  const [playerId, setPlayerId] = useState(0);
  const [showPlayerInfo, setShowPlayerInfo] = useState(false);
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "This field is required.";

    setErrors({
      ...temp,
    });
    // Check that every item in the array has a blank result (no errors) else return false.
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    handleToggleChange,
    resetForm,
  } = useForm(initialFValues);
  //#endregion

  //#region //* Hooks
  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);
  useEffect(() => {
    const getTableData = async (e) => {
      try {
        const response = await PlayerService.getAllRecords().then();
        setRecords(response.data);
      } catch (e) {
        console.log("API call unsuccessful", e);
      }
    };
    getTableData();
  }, []);
  useEffect(() => {
    if (recordForEdit.id > 0) {setShowPlayerInfo(true); return;} else {setShowPlayerInfo(false);}
    const getPlayerRecord = async () => {
      try {
        const response = await PlayerService.getRecordById(playerId).then();
        recordForEdit.player = response.data[0];
        console.log("Player", recordForEdit);
        if (playerId > 0) {setShowPlayerInfo(true);}
      } catch (e) {
        console.log("Player API call unsuccessful", e);
      }
    };
    getPlayerRecord()
  }, [playerId]);
  //#endregion

  //#region //* Event Handlers
  const handlePlayerChange = (event) => {
    handleInputChange(event);
    // load avatar
    setPlayerId(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("values", values);
    if (validate()) addOrEdit(values, resetForm);
  };
  const handleReset = () => {
    if (recordForEdit == null) resetForm();
    else setValues({ ...recordForEdit });

  };
  //#endregion

  return (
    <Fragment>
      <Form>
        <Grid container>
          {/* //& Player Info */}
          <Grid item xs={6} sx={{ pr: 5 }}>
            <Grid
              item
              xs={12}
              sx={{ pb: 5, display: "flex", justifyContent: "center" }}
            >
              {/* {recordForEdit.playerId > 0 ? (
                <> */}
                  {recordForEdit.player?.avatarImage ? (
                    <Avatar
                      sx={{width: 75,height: 75,}}
                      src={recordForEdit.player.avatarImage}
                    />
                  ) : (
                    <Avatar
                      sx={{
                        width: 75,
                        height: 75,
                      }}
                    >
                      Name
                      {/* {playerName[0].toUpperCase()} */}
                    </Avatar>
                  )}
                {/* </>
              ) : (
                null
              )} */}

            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              {recordForEdit.playerID > 0 ? (
                <Typography variant="h3">
                  {recordForEdit.player?.playerName}
                </Typography>
              ) : (
                <SelectPlayer
                  name="playerId"
                  label="Player Name"
                  value={values.playerId}
                  onChange={handlePlayerChange}
                  error={errors.type}
                  records={records}
                />
              )}
            </Grid>
            <Grid container sx={{ mt: 5, display: "flex" }}>
              <Grid item xs={6}>
                <Typography
                  variant="body2"
                  sx={{ mt: 4, display: "flex", alignItems: "center" }}
                >
                  {recordForEdit.player?.discordId ? (<FaDiscord
                    size={24}
                    sx={{
                      color: (theme) => theme.palette.text.secondary,
                    }}
                  />) : null}
                  <Box sx={{ ml: 3 }}>{recordForEdit.player?.discordId}</Box>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {recordForEdit.player?.discordId ? (
                  <Controls.TextField
                    name="discordNickName"
                    label="Discord Nickname"
                    value={values.discordNickName}
                    onChange={handleInputChange}
                    error={errors.discordNickName}
                  />
                ) : null}
              </Grid>
            </Grid>
          </Grid>

          {/* //& PC Info */}
          <Grid container xs={6} spacing={4} sx={{ pt: 3, pl: 3 }}>
            <Grid container xs={7} spacing={4} sx={{ pt: 3, pl: 4 }}>
              <Grid item xs={12}>
                <Controls.TextField
                  name="pcName"
                  label="PC Name"
                  value={values.pcName}
                  onChange={handleInputChange}
                  error={errors.pcName}
                />
              </Grid>
              <Grid item xs={12}>
                <Controls.TextField
                  name="pcRace"
                  label="PC Race"
                  value={values.pcRace}
                  onChange={handleInputChange}
                  error={errors.pcRace}
                />
              </Grid>
            </Grid>
            {/* //& Token Image */}
            <Grid
              item
              xs={5}
              sx={{ mt: 7, ml: 3, display: "flex", justifyContent: "center" }}
            >
              <Tooltip
                arrow
                placement="top"
                title={"Click to change token image"}
              >
                <Avatar
                  variant="square"
                  sx={{
                    mx: 1,
                    width: 75,
                    height: 75,
                    borderRadius: "10px",
                    // isolation: "isolate",
                  }}
                  src={
                    values.tokenUrl != ""
                      ? values.tokenUrl
                      : "/assets/images/placeholder.jpg"
                  }
                />
              </Tooltip>
            </Grid>
            <Grid item xs={12}>
              <Controls.TextField
                name="pcClass"
                label="PC Class/Level"
                value={values.pcClass}
                onChange={handleInputChange}
                error={errors.pcClass}
              />
            </Grid>
          </Grid>

          {/* //& Button Row */}
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
          >
            <Controls.Button
              type="submit"
              text="Submit"
              onClick={handleSubmit}
            />
            <Controls.Button
              color="secondary"
              text="Reset"
              onClick={handleReset}
            />
          </Grid>
        </Grid>
      </Form>
    </Fragment>
  );
};

export default CampaignPlayerDialog;

CampaignPlayerDialog.propTypes = {
  addOrEdit: PropTypes.func,
  recordForEdit: PropTypes.object,
};
