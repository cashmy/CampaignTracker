import { useState, useEffect } from "react";
import moment from "moment";
import Box from "@mui/material/Box";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Tooltip from "@mui/material/Tooltip";
import TableCard from "@/../../components/controls/TableCard";
import SessionService from "@/../../services/session.service";
import LoopIcon from "@mui/icons-material/Loop";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CheckIcon from "@mui/icons-material/Check";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import AppScrollbar from "@/../../lib/components/AppScrollbar";

const TimelineList = (props) => {
  const { adventure } = props;
  const [loading, setLoading] = useState(false);
  const [loadData, setLoadData] = useState(true);
  const [timelines, setTimelines] = useState([]);

  useEffect(() => {
    if (adventure === undefined) return;
    const getTableData = async (e) => {
      try {
        setLoading(true);
        const response = await SessionService.getAdventureTimeline(
          adventure.id
        ).then();
        setTimelines(response.data);
        setLoading(false);
        setLoadData(false);
      } catch (e) {
        console.log("API call unsuccessful", e);
      }
    };
    getTableData();
  }, [adventure, loadData]);

  //#region //* Event Handlers
  const onTimelineClick = (record) => {
    alert("TimelineList.onTimelineClick", record.id);
  };
  const timeLineDots = (status) => {
    switch (status) {
      case "sc":
        return (
          <TimelineDot sx={{ backgroundColor: "lightslategray" }}>
            <CheckIcon fontSize="24px" />
          </TimelineDot>
        );
      case "ip":
        return (
          <TimelineDot sx={{ backgroundColor: "purple" }}>
            <LoopIcon fontSize="24px" />
          </TimelineDot>
        );
      case "pl":
        return (
          <TimelineDot sx={{ backgroundColor: "darkgoldenrod" }}>
            <MailOutlineIcon fontSize="24px" />
          </TimelineDot>
        );
      default:
        return (
          <TimelineDot sx={{ backgroundColor: "darkred" }}>
            <HelpOutlineIcon />
          </TimelineDot>
        );
    }
  };
  const tooltipText = (record) => {
    var statusText = "";
    switch (record.status) {
      case "sc":
        statusText = "Completed";
        break;
      case "ip":
        statusText = "In Progress";
        break;
      case "pl":
        statusText = "Planned";
        break;
      default:
        statusText = "Unknown";
        break;
    }
    return (
      <>
        <b>{statusText}</b>: {record.activity}
      </>
    );
  };
  const sideQuestIcon = (record) => {
    if (record.sideQuest) {
      return ( 
      "🏰 " + record.name )
    } else {
      return record.name;
    }
  };
  //#endregion

  return (
    <div className="timeline-list">
      <TableCard
        title={
          adventure ? "Timeline for: " : "Timeline - (Adventure not selected)"
        }
        title2={adventure ? adventure.name : ""}
        chipColor={"lightyellow"}
      >
        {loading && <div>Loading...</div>}
        {adventure && (
          <AppScrollbar className="scroll-app-sidebar">
            <Box
              sx={{
                pr: 4,
                pb: { xs: 4, md: 5, lg: 6.2 },
              }}
            >
              <Timeline sx={{ height: "575px" }}>
                {timelines.map((timeline, index) => (
                  <TimelineItem key={index}>
                    <TimelineOppositeContent
                      sx={{ mt: 2, ml: "-3px" }}
                      align="right"
                      variant="body2"
                      color="text.secondary"
                    >
                      {moment(timeline.sessionDate).format("MM/DD/YYYY")}
                    </TimelineOppositeContent>

                    <TimelineSeparator>
                      <Tooltip title={tooltipText(timeline)} placement="top">
                        {timeLineDots(timeline.status)}
                      </Tooltip>
                      {index >= timelines.length - 1 ? null : (
                        <TimelineConnector />
                      )}
                    </TimelineSeparator>

                    <TimelineContent sx={{ minWidth: "140px" }} variant="body2">
                      {/* {timeline.name} */}
                      {sideQuestIcon(timeline)}
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </Box>
          </AppScrollbar>
        )}
      </TableCard>
    </div>
  );
};

export default TimelineList;
