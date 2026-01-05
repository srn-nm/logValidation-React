import BarChartIcon from '@mui/icons-material/BarChart';
import TableChartIcon from '@mui/icons-material/TableChart';
import LogoutIcon from '@mui/icons-material/Logout';

interface DrawerItem {
  id: string;
  label: string;
  path: string;
}

interface DrawerGroup {
  groupName: string;
  items: DrawerItem[];
  path?: string;
  icon: React.ReactNode;
  iconandName: React.ReactNode;
}

export const drawerGroups: DrawerGroup[] = [
  {
    groupName: "Dashboard",
    items: [],
    path: "/Dashboard",
    icon: <BarChartIcon />,
    iconandName: (
      <>
        <BarChartIcon />
        <div className="pl-2">Dashboard</div>
      </>
    ),
  },
  {
    groupName: "Logs",
    items: [],
    path: "/Logs",
    icon: <TableChartIcon />,
    iconandName: (
      <>
        <TableChartIcon />
        <div className="pl-2">Log Table</div>
      </>
    ),
  },
  {
    groupName: "Logout",
    items: [],
    path: "/Login",
    icon: <LogoutIcon />,
    iconandName: (
      <>
        <LogoutIcon />
        <div className="pl-2">Logout</div>
      </>
    ),
  },
];