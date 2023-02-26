import React from 'react';
import { alpha, Box, Button, Select } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { Field, Form } from 'formik';
import { useDropzone } from 'react-dropzone';
// import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
// import IntlMessages from '@crema/helpers/IntlMessages';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Fonts } from '@@/../../lib/constants/AppEnums';
import EditIcon from '@mui/icons-material/Edit';
import AppGridContainer from '@/../../lib/components/AppGridContainer';
import Grid from '@mui/material/Grid';
import AppTextField from '@/../../lib/components/AppFormComponents/AppTextField';
import AppDateFiled from '@/../../lib/components/AppFormComponents/AppDateFiled';

import { styled } from '@mui/material/styles';
import { usePlayersContext } from '../PlayersContextProvider';
import { blue, green, red } from '@mui/material/colors';

const HeaderWrapper = styled('div')(({ theme }) => {
  return {
    padding: 20,
    marginLeft: -24,
    marginRight: -24,
    marginTop: -20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.palette.divider}`,
    '& .dropzone': {
      outline: 0,
      '&:hover .edit-icon, &:focus .edit-icon': {
        display: 'flex',
      },
    },
  };
});

const AvatarViewWrapper = styled('div')(({ theme }) => {
  return {
    position: 'relative',
    cursor: 'pointer',
    '& .edit-icon': {
      position: 'absolute',
      bottom: 0,
      right: 0,
      zIndex: 1,
      border: `solid 2px ${theme.palette.background.paper}`,
      backgroundColor: alpha(theme.palette.primary.main, 0.7),
      color: theme.palette.primary.contrastText,
      borderRadius: '50%',
      width: 26,
      height: 26,
      display: 'none',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.4s ease',
      '& .MuiSvgIcon-root': {
        fontSize: 16,
      },
    },
  };
});

const AddPlayerForm = (props) => {
  const { values, userImage, setUserImage, setFieldValue } = props;
  // const { labelList } = usesPlayerContext();
  const labelList = [
    { id: 311, name: 'Crema', alias: 'crema', color: red[500] },
    { id: 312, name: 'Personal', alias: 'personal', color: blue[500] },
    { id: 313, name: 'Work', alias: 'work', color: green[500] },
  ] 

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setUserImage(URL.createObjectURL(acceptedFiles[0]));
    },
  });

  // const { messages } = useIntl();

  return (
    <Form noValidate autoComplete="off">
      <HeaderWrapper>
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <label htmlFor="icon-button-file">
            <AvatarViewWrapper>
              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                }}
                src={userImage ? userImage : ''}
              />
              <Box className="edit-icon">
                <EditIcon />
              </Box>
            </AvatarViewWrapper>
          </label>
        </div>
        {values.name ? (
          <Box component="h4" fontWeight={Fonts.SEMI_BOLD} mt={2}>
            {values.name}
          </Box>
        ) : null}
      </HeaderWrapper>

      <Box
        sx={{
          padding: 5,
          ml: -6,
          mr: -6,
        }}
      >
        <Box
          sx={{
            pb: 5,
            px: 5,
            mx: -5,
            mb: 5,
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          <Box
            component="h6"
            sx={{
              mb: { xs: 4, xl: 6 },
              fontSize: 14,
              fontWeight: Fonts.SEMI_BOLD,
            }}
          >
            {/* <IntlMessages id="PlayerApp.personalDetails" /> */}
            Personal Details
          </Box>

          <div>
            <AppTextField
              sx={{
                width: '100%',
                mb: { xs: 4, xl: 6 },
              }}
              variant="outlined"
              // label={<IntlMessages id="common.name" />}
              label="Name"
              name="name"
            />

            <AppTextField
              sx={{
                width: '100%',
                mb: { xs: 4, xl: 6 },
              }}
              variant="outlined"
              // label={<IntlMessages id="common.email" />}
              label="Email"
              name="email"
            />

            <AppTextField
              sx={{
                width: '100%',
                mb: { xs: 4, xl: 6 },
              }}
              variant="outlined"
              // label={<IntlMessages id="common.phone" />}
              label="Phone"
              name="Player"
            />
            <AppGridContainer spacing={5}>
              <Grid item xs={12} md={6}>
                <AppDateFiled
                  autoOk
                  disableFuture
                  sx={{
                    width: '100%',
                    mb: { xs: 4, xl: 6 },
                  }}
                  format="MM/DD/YYYY"
                  variant="outlined"
                  inputVariant="outlined"
                  // label={<IntlMessages id="common.birthday" />}
                  label="Birthday"
                  name="birthday"
                  value={values.birthday}
                  onChange={(value) => setFieldValue('birthday', value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl
                  variant="outlined"
                  sx={{
                    width: '100%',
                  }}
                >
                  <InputLabel id="label-select-outlined-label">
                    {/* <IntlMessages id="common.selectLabel" /> */}
                    Select Label
                  </InputLabel>
                  <Field
                    name="label"
                    // label={<IntlMessages id="common.selectLabel" />}
                    label="Select Label"
                    labelId="label-select-outlined-label"
                    as={Select}
                    sx={{
                      width: '100%',
                      mb: { xs: 4, xl: 6 },
                    }}
                  >
                    {labelList.map((label) => {
                      return (
                        <MenuItem
                          value={label.id}
                          key={label.id}
                          sx={{
                            cursor: 'pointer',
                          }}
                        >
                          {label.name}
                        </MenuItem>
                      );
                    })}
                  </Field>
                </FormControl>
              </Grid>
            </AppGridContainer>

            <AppTextField
              sx={{
                width: '100%',
              }}
              variant="outlined"
              // label={<IntlMessages id="common.website" />}
              label="Website"
              name="website"
            />
          </div>
        </Box>

        <Box
          sx={{
            pb: 5,
            px: 5,
            mx: -5,
            mb: 5,
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          <Box
            component="h6"
            sx={{
              mb: { xs: 4, xl: 6 },
              fontSize: 14,
              fontWeight: Fonts.SEMI_BOLD,
            }}
          >
            {/* <IntlMessages id="common.otherDetails" /> */}
            Other Details
          </Box>

          <div>
            <AppTextField
              sx={{
                width: '100%',
                mb: { xs: 4, xl: 6 },
              }}
              variant="outlined"
              // label={<IntlMessages id="common.company" />}
              label="Company"
              name="company"
            />

            <AppTextField
              sx={{
                width: '100%',
              }}
              variant="outlined"
              // label={<IntlMessages id="common.address" />}
              label="Address"
              name="address"
            />
          </div>
        </Box>

        <Box
          sx={{
            pb: 5,
            px: 5,
            mx: -5,
            mb: 5,
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          <Box
            component="h6"
            sx={{
              mb: { xs: 4, xl: 6 },
              fontSize: 14,
              fontWeight: Fonts.SEMI_BOLD,
            }}
          >
            {/* <IntlMessages id="common.socialMedia" /> */}
            Social Media
          </Box>

          <div>
            <AppTextField
              sx={{
                width: '100%',
                mb: { xs: 4, xl: 6 },
              }}
              variant="outlined"
              // label={<IntlMessages id="common.facebookId" />}
              label="Facebook ID"
              name="facebookId"
            />

            <AppTextField
              sx={{
                width: '100%',
              }}
              variant="outlined"
              // label={<IntlMessages id="common.twitterId" />}
              label="Twitter ID"
              name="twitterId"
            />
          </div>
        </Box>

        <div>
          <Box
            component="h6"
            sx={{
              mb: { xs: 4, xl: 6 },
              fontSize: 14,
              fontWeight: Fonts.SEMI_BOLD,
            }}
          >
            {/* <IntlMessages id="common.notes" /> */}
            Notes
          </Box>

          <AppTextField
            name="notes"
            multiline
            sx={{
              width: '100%',
            }}
            rows="4"
            variant="outlined"
            // placeholder={messages['common.notes']}
            placeholder="Notes"
          />
        </div>
      </Box>

      <Box
        sx={{
          pb: 4,
          mx: -1,
          textAlign: 'right',
        }}
      >
        <Button
          sx={{
            position: 'relative',
            minWidth: 100,
          }}
          color="primary"
          variant="outlined"
          type="submit"
        >
          {/* <IntlMessages id="common.save" /> */}
          Save
        </Button>
      </Box>
    </Form>
  );
};

export default AddPlayerForm;

AddPlayerForm.propTypes = {
  values: PropTypes.object.isRequired,
  userImage: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
  setUserImage: PropTypes.func,
  setFieldValue: PropTypes.func,
  handleAddPlayerClose: PropTypes.func,
};
