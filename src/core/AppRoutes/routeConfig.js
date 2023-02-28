// Import Icons below
import { BsFillPeopleFill } from "react-icons/bs";
import { CgRename } from "react-icons/cg";
import { BsTable } from "react-icons/bs";
import { MdCampaign, MdOutlineContactPhone, MdDashboard } from "react-icons/md";

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
        id: 'campaigns',
        title: 'Campaigns',
        messageId: 'sidebar.apps.campaigns',
        type: 'item',
        icon: <MdCampaign />,
        url: '/campaigns',
      },
      {
        id: 'players',
        title: 'Players',
        messageId: 'sidebar.apps.players',
        type: 'item',
        icon: <MdOutlineContactPhone />,
        url: '/players',
      },
      {
        id: "characters",
        title: "Characters",
        messageId: "sidebar.app.dashboard.default",
        type: "item",
        icon: <BsFillPeopleFill/>,
        url: "/dashboards/default",
      },
      {
        id: "dashTables",
        title: "Tables",
        messageId: "sidebar.app.dashboard.tables",
        type: "item",
        icon: <BsTable />,
        url: "/error-pages/coming-soon",
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
        messageId: "sidebar.app.dashboard.default",
        type: "item",
        icon: <CgRename/>,
        url: "401",
      },
    ],
  }
];
export default routesConfig;