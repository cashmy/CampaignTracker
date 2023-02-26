import React from 'react';
import { Icon, ListItem, ListItemText } from '@mui/material';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Badge from '@mui/material/Badge';
import { useRouter } from 'next/router';
import { useSidebarContext } from '@/../../lib/context/AppContextProvider/SidebarContextProvider';
// import IntlMessages from '@crema/helpers/IntlMessages';
import { allowMultiLanguage } from '@/../../lib/constants';
import { isUrlInChildren } from '@/../../lib/helpers';

const HorizontalItem = (props) => {
  const { item, dense } = props;

  const router = useRouter();
  const { pathname } = router;
  const active = isUrlInChildren(item, pathname);
  const { sidebarMenuSelectedBgColor, sidebarMenuSelectedTextColor } =
    useSidebarContext();


  return (
    <Link href={item.url} as={item.as}>
      <ListItem
        className={clsx('navItemSubmenu', dense && 'dense', {
          active: item.url === router.pathname,
        })}
        exact={item.exact}
        sx={{
          minHeight: 40,
          padding: '4px 12px',
          color: (theme) => theme.palette.text.primary,
          textDecoration: 'none!important',
          minWidth: 160,
          '&.active': {
            backgroundColor: sidebarMenuSelectedBgColor,
            color: sidebarMenuSelectedTextColor + '!important',
            pointerEvents: 'none',
            '& .list-item-text-primary': {
              color: 'inherit',
            },
            '& .list-item-icon': {
              color: 'inherit',
            },
          },
          '& .list-item-text': {
            padding: '0 0 0 16px',
          },
          '&.dense': {
            padding: '4px 12px',
            minHeight: 40,
            '& .list-item-text': {
              padding: '0 0 0 8px',
            },
          },
        }}
      >
        {item.icon && (
          <Icon
            sx={{
              color: active ? sidebarMenuSelectedTextColor : 'action',
              mr: 3,
              fontSize: { xs: 16, xl: 18 },
            }}
          >
            {item.icon}
          </Icon>
        )}
        <ListItemText
          className="AppNavLinkTextSubmenu"
          // primary={
          //   allowMultiLanguage ? (
          //     <IntlMessages id={item.messageId} />
          //   ) : (
          //     item.title
          //   )}
          primary={item.title}
        />
        {item.count && (
          <Box ml={4} clone>
            <Badge
              count={item.count}
              sx={{
                color: item.color,
              }}
            />
          </Box>
        )}
      </ListItem>
    </Link>
  );
};

HorizontalItem.defaultProps = {};

export default React.memo(HorizontalItem);

HorizontalItem.propTypes = {
  item: PropTypes.object,
  dense: PropTypes.bool,
};
