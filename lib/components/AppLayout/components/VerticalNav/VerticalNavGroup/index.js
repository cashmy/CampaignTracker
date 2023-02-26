import React, { useMemo } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import VerticalCollapse from '../VerticalCollapse';
import VerticalItem from '../VerticalItem';
import VerticalNavGroupItem from './VerticalNavGroupItem';
import { useSidebarContext } from '@/../../lib/context/AppContextProvider/SidebarContextProvider';
import { useAuthUser } from '@/../../lib/hooks/AuthHooks';
import { checkPermission } from '@/../../lib/helpers';
// import IntlMessages from '@/../../lib/helpers/IntlMessages';
import { allowMultiLanguage } from '@/../../lib/constants';

const VerticalNavGroup = ({ item, router, level }) => {
  const { sidebarTextColor } = useSidebarContext();
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
      <VerticalNavGroupItem
        level={level}
        sidebarTextColor={sidebarTextColor}
        component="div"
        className={clsx('nav-item nav-item-header')}
      >
        {/* {allowMultiLanguage ?  <IntlMessages id={item.messageId} /> 
        : item.title} */}
        {item.title}
      </VerticalNavGroupItem>

      {item.children && (
        <>
          {item.children.map((item) => (
            <React.Fragment key={item.id}>
              {item.type === 'group' && (
                <NavVerticalGroup item={item} level={level} router={router} />
              )}

              {item.type === 'collapse' && (
                <VerticalCollapse item={item} level={level} router={router} />
              )}

              {item.type === 'item' && (
                <VerticalItem item={item} level={level} router={router} />
              )}
            </React.Fragment>
          ))}
        </>
      )}
    </>
  );
};

VerticalNavGroup.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    type: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    permittedRole: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    messageId: PropTypes.string,
    children: PropTypes.array,
  }),
  level: PropTypes.number,
  router: PropTypes.object,
};

VerticalNavGroup.defaultProps = {};

const NavVerticalGroup = VerticalNavGroup;

export default NavVerticalGroup;
