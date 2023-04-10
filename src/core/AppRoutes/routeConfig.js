// Import Icons below
import { BsFillPeopleFill } from "react-icons/bs";
import { CgRename } from "react-icons/cg";
import { BsTable } from "react-icons/bs";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import LanguageIcon from '@mui/icons-material/Language';
import PublicIcon from '@mui/icons-material/Public';
import {
  MdCampaign,
  MdOutlineContactPhone,
  MdDashboard,
  MdOutlineImageSearch,
} from "react-icons/md";
import { FaDiceD20 } from "react-icons/fa";
// import { GiDiceTwentyFacesTwenty } from "react-icons/gi";
import { IoImage, IoImages } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import { GiToken } from "react-icons/gi";
import { RiSideBarFill } from "react-icons/ri";

const routesConfig = [
  {
    id: "app",
    title: "Application",
    messageId: "sidebar.application",
    type: "group",
    children: [
      {
        id: "dashboard",
        title: "Dashboard",
        messageId: "sidebar.app.dashboard.campaigns",
        type: "item",
        icon: <MdDashboard />,
        url: "/dashboards/campaigns",
      },
      {
        id: "campaigns",
        title: "Campaigns",
        messageId: "sidebar.app.campaigns",
        type: "item",
        icon: <MdCampaign />,
        url: "/campaigns",
      },
      {
        id: "players",
        title: "Players",
        messageId: "sidebar.app.players",
        type: "item",
        icon: <MdOutlineContactPhone />,
        url: "/players/folder/all",
      },
      {
        id: "characters",
        title: "Characters",
        messageId: "sidebar.app.dashboard.default",
        type: "item",
        icon: <BsFillPeopleFill />,
        url: "/dashboards/default",
      },
      {
        id: "imageLibaries",
        title: "Image Libaries",
        messageId: "sidebar.app.imageLibaries",
        type: "collapse",
        icon: <IoImages />,
        children: [
          {
            id: "images",
            title: "Images",
            messageId: "sidebar.app.imageLibaries.images",
            icon: <IoImage />,
            type: "item",
            url: "/images?imageType=i",
          },
          {
            id: "avatars",
            title: "Avatars",
            messageId: "sidebar.app.imageLibaries.avatars",
            icon: <RxAvatar />,
            type: "item",
            url: "/images?imageType=a",
          },
          {
            id: "tokens",
            title: "Tokens",
            messageId: "sidebar.app.imageLibaries.tokens",
            icon: <GiToken />,
            type: "item",
            url: "/images?imageType=t",
          },
          {
            id: "sidebars",
            title: "Sidebars",
            messageId: "sidebar.app.imageLibaries.sidebars",
            icon: <RiSideBarFill />,
            type: "item",
            url: "/images?imageType=s"
          },
        ],
      },
    ],
  },
  {
    id: "tables",
    title: "Tables",
    messageId: "sidebar.tables",
    type: "group",
    children: [
      {
        id: "names",
        title: "Names",
        messageId: "sidebar.app.dashboard.names",
        type: "item",
        icon: <CgRename />,
        url: "401",
      },
    ],
  },
  {
    id: "admin",
    title: "Admin Only",
    messageId: "sidebar.admin",
    type: "group",
    children: [
      {
        id: "timeZones",
        title: "Time Zones",
        messageId: "sidebar.app.dashboard.timeZones",
        type: "item",
        icon: <LanguageIcon sx={{height: 20, width: 20}} />,
        url: "401",
      },
      {
        id: "countries",
        title: "Country Codes",
        messageId: "sidebar.app.dashboard.contries",
        type: "item",
        icon: <PublicIcon sx={{height: 20, width: 20}} />,
        url: "401",
      },
    ]
  }
];
export default routesConfig;
