import React, { useEffect, useMemo, useState } from 'react';
import { Collapse, Icon, IconButton, ListItemText } from '@mui/material';

import clsx from 'clsx';
import PropTypes from 'prop-types';
import PropsTypes from 'prop-types';
import VerticalItem from '../VerticalItem';
import Box from '@mui/material/Box';
import VerticalCollapseItem from './VerticalCollapseItem';
import { useRouter } from 'next/router';
import { useThemeContext } from '@/../../lib/context/AppContextProvider/ThemeContextProvider';
import { useSidebarContext } from '@/../../lib/context/AppContextProvider/SidebarContextProvider';
// import IntlMessages from '@crema/helpers/IntlMessages';
import { useAuthUser } from '@/../../lib/hooks/AuthHooks';
import { checkPermission, isUrlInChildren } from '@/../../lib/helpers';
import { allowMultiLanguage } from '@/../../lib/constants';

const needsToBeOpened = (pathname, item) => {
  return pathname && isUrlInChildren(item, pathname);
};



const VerticalCollapse = ({ item, router, level }) => {
  const { theme } = useThemeContext();
  const { sidebarTextColor } = useSidebarContext();
  const { pathname } = useRouter();
  const [open, setOpen] = useState(() => needsToBeOpened(pathname, item));

  useEffect(() => {
    if (needsToBeOpened(pathname, item)) {
      setOpen(true);
    }
  }, [pathname, item]);

  const handleClick = () => {
    setOpen(!open);
  };

  const { user } = useAuthUser();
  const hasPermission = useMemo(
    () => checkPermission(item.permittedRole, user?.role),
    [item.permittedRole, user?.role]
  );

  if (!hasPermission) {
    return null;
  }

  return (
    <>
      <VerticalCollapseItem
        level={level}
        sidebarTextColor={sidebarTextColor}
        button
        component="div"
        className={clsx('menu-vertical-collapse', open && 'open')}
        onClick={handleClick}
      >
        {item.icon && (
          <Box component="span">
            <Icon
              sx={{ mr: 4 }}
              color="action"
              className={clsx('nav-item-icon')}
            >
              {item.icon}
            </Icon>
          </Box>
        )}
        <ListItemText
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontSize: 14,
          }}
          className="nav-item-content"
          classes={{ primary: clsx('nav-item-text') }}
          // primary={
          //   allowMultiLanguage ? (
          //     // <IntlMessages id={item.messageId} />
          //   ) : (
          //     item.title
          //   )}
          primary={item.title}
        />
        <IconButton
          className="nav-item-icon-arrow-btn"
          sx={{ p: 0, mr: 0.75 }}
          disableRipple
          size="large"
        >
          <Icon className="nav-item-icon-arrow" color="inherit">
            {open
              ? 'expand_more'
              : theme.direction === 'ltr'
              ? 'chevron_right'
              : 'chevron_left'}
          </Icon>
        </IconButton>
      </VerticalCollapseItem>

      {item.children && (
        <Collapse in={open} className="collapse-children">
          {item.children.map((item) => (
            <React.Fragment key={item.id}>
              {item.type === 'collapse' && (
                <VerticalCollapse
                  item={item}
                  level={level + 1}
                  router={router}
                />
              )}

              {item.type === 'item' && (
                <VerticalItem item={item} level={level + 1} router={router} />
              )}
            </React.Fragment>
          ))}
        </Collapse>
      )}
    </>
  );
};

VerticalCollapse.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    permittedRole: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    children: PropTypes.array,
    messageId: PropTypes.string,
    type: PropTypes.string,
  }),
  level: PropTypes.number,
  router: PropsTypes.object,
};
VerticalCollapse.defaultProps = {};

export default React.memo(VerticalCollapse);
