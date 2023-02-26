import React, { isValidElement } from 'react';
import Card from '@mui/material/Card';
import PropTypes from 'prop-types';
import { Box, CardHeader, Chip, Fab } from '@mui/material';
import { Fonts } from '@/../../lib/constants/AppEnums';
// import Link from '@mui/material/Link';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import AddIcon from '@mui/icons-material/Add';
import TextContrast from 'lib/helpers/getTextContrast';

const TableCard = ({
  sxStyle,
  title,
  title2,
  chipColor,
  titleStyle,
  headerStyle,
  contentStyle,
  action,
  actionStyle,
  footer,
  footerPosition,
  footerStyle,
  onClickHandler,
  children,
  ...rest
}) => {

  return (
    <Card
      sx={{ display: 'flex', flexDirection: 'column', ...sxStyle }}
      {...rest}
    >
      {/* {title || action ? ( */}
      {title ? (
        <CardHeader
          sx={{
            px: 6,
            pb: 0,
            '& .MuiCardHeader-action': {
              marginTop: 0,
              marginRight: 0,
            },
            '& .MuiCardHeader-content': {
              overflow: 'hidden',
            },
            ...headerStyle,
          }}
          title={
            typeof title === 'object' ? (
              title
            ) : (
              <Box
                component="h3"
                sx={{
                  mt:2, mb:2,
                  color: 'text.primary',
                  fontWeight: Fonts.SEMI_BOLD,
                  fontSize: 16,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  width: '100%',
                  ...titleStyle, 
                }}
              >
                {title} {title2 
                ? <Chip 
                    label={title2.substring(0,29) + (title2.length > 30 ? '...' : "")} 
                    sx={{backgroundColor: `${chipColor}` , color: TextContrast.getTextContrast(chipColor)  }} 
                  /> 
                : "" }
              </Box>
            )
          }
          action={
            typeof action === 'object' ? (
              action
            ) : typeof action === 'string' && action !== "" ? (
              <span {...actionStyle}>
                <Fab size="small" aria-label="add" sx={{mt: 2}} color="primary">
                  <AddIcon onClick={onClickHandler} />
                </Fab>
              </span>
            ) : (<></>)
          }
        />
      ) : null}
      <CardContent
        sx={{
          height: '100%',
          px: 6,
          '&:last-of-type': {
            pb: 4,
          },
          ...contentStyle,
        }}
      >
        {children}
      </CardContent>
      {footer ? (
        <CardActions
          sx={{
            px: 6,
            pb: 4,
            ...footerStyle,
          }}
        >
          {isValidElement(footer) ? (
            footer
          ) : (
            <Box
              component="span"
              sx={{ ml: footerPosition === 'right' ? 'auto' : 0 }}
            >
              <Link
                color="secondary"
                component="button"
                underline="none"
                sx={{
                  fontSize: 14,
                  fontWeight: Fonts.MEDIUM,
                }}
              >
                {footer}
              </Link>
            </Box>
          )}
        </CardActions>
      ) : null}
    </Card>
  );
};

export default TableCard;

TableCard.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  action: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  footer: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  footerPosition: PropTypes.string,
  className: PropTypes.string,
  sxStyle: PropTypes.object,
  footerStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  headerStyle: PropTypes.object,
  contentStyle: PropTypes.object,
  actionStyle: PropTypes.object,
  children: PropTypes.node,
};

TableCard.defaultProps = {
  footerPosition: 'left',
};
