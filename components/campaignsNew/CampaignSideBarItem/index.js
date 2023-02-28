import React from 'react';
import PropTypes from 'prop-types';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import { BiTargetLock } from "react-icons/bi";
import { GiPistolGun } from "react-icons/gi";
import { MdCampaign } from "react-icons/md";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { alpha, styled } from '@mui/material/styles';
import { Fonts } from '@/../../lib/constants/AppEnums';
import AppNavLink from '@/../../lib/components/AppNavLink';

const CampaignSideBarList = styled(ListItem)(({ theme }) => {
  return {
    padding: '7px 16px',
    borderRadius: '0 30px 30px 0',
    marginBottom: 1,
    marginTop: 1,
    [theme.breakpoints.up('md')]: {
      paddingLeft: 20,
      paddingRight: 20,
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 24,
      paddingRight: 24,
    },

    '& svg': {
      fontSize: '18px',
    },

    '&:hover,&:focus,&.active': {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      color: theme.palette.primary.main,

      '& .material-icons, & svg, & .MuiTypography-root': {
        color: theme.palette.primary.main,
      },
    },

    '&.active': {
      color: theme.palette.primary.main,

      '& .material-icons, & .MuiTypography-root': {
        color: theme.palette.primary.main,
      },
      '& .list-item-text': {
        '& .MuiTypography-body1': {
          fontWeight: Fonts.SEMI_BOLD,
        },
      },
    },
  };
});

const getIconByName = (type) => {
  switch (type) {
    case 'o':
      return <BiTargetLock />;
    case 'a':
      return <GiPistolGun />;
    case 'c':
      return <MdCampaign />;
    default:
      return <QuestionMarkIcon />;
  }
};

const CampaignSideBarItem = ({ item, path }) => {
  
  return (
    <CampaignSideBarList
      button
      key={item.id}
      to={path}
      component={AppNavLink}
      activeClassName="active"
    >
      <ListItemIcon
        sx={{
          minWidth: 10,
          mr: 3.5,
          '& .material-icons, & svg': {
            fontSize: 22,
            color: (theme) => theme.palette.text.secondary,
          },
        }}
      >
        {getIconByName(item.type)}
      </ListItemIcon>
      {item.archived && <ListItemText
        primary={item.name}
        sx={{
          color: (theme) => theme.palette.text.secondary,
          fontStyle: "italic",
           my: 0,
          '& .MuiTypography-body1': {
            fontSize: 14,
            mb: 0.5,
          },
        }}
        className="list-item-text"
      />}
      {!item.archived && <ListItemText
        primary={item.name}
        sx={{
          color: (theme) => theme.palette.text.primary,
           my: 0,
          '& .MuiTypography-body1': {
            fontSize: 14,
            mb: 0.5,
          },
        }}
        className="list-item-text"
      />}
    </CampaignSideBarList>
  );
};

export default CampaignSideBarItem;

CampaignSideBarItem.propTypes = {
  item: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
};
