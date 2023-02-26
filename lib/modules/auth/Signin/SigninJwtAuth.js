import React from 'react';
import Button from '@mui/material/Button';
import { Checkbox } from '@mui/material';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

import AppInfoView from '@/../../lib/components/AppInfoView';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
// import IntlMessages from '@/../../lib/helpers/IntlMessages';
import { useIntl } from 'react-intl';
import AppTextField from '@/../../lib/components/AppFormComponents/AppTextField';
import { useAuthMethod } from '@/../../lib/hooks/AuthHooks';
import { Fonts } from '@/../../lib/constants/AppEnums';
import AuthWrapper from '../AuthWrapper';

const validationSchema = yup.object({
  email: yup
    .string()
    // .email(<IntlMessages id="validation.emailFormat" />)
    .email("The Email you entered is not a valid format!")
    // .required(<IntlMessages id="validation.emailRequired" />),
    .required("Please enter Email Address!"),
  password: yup
    .string()
    // .required(<IntlMessages id="validation.passwordRequired" />),
    .required("Please enter password!"),
});

const SigninJwtAuth = () => {
   const router = useRouter();
  const { signInUser } = useAuthMethod();
  const onGoToForgetPassword = () => {
    router.push('/forget-password', { tab: 'jwtAuth' });
  };

  const { messages } = useIntl();

  return (
    <AuthWrapper>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', mb: 5 }}>
          <Formik
            validateOnChange={true}
            initialValues={{
              email: 'crema.demo@gmail.com',
              password: 'Pass@1!@all',
            }}
            validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting }) => {
              setSubmitting(true);
              signInUser({
                email: data.email,
                password: data.password,
              });
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form style={{ textAlign: 'left' }} noValidate autoComplete="off">
                <Box sx={{ mb: { xs: 5, xl: 8 } }}>
                  <AppTextField
                    placeholder={messages['common.email']}
                    name="email"
                    // label={<IntlMessages id="common.email" />}
                    label="Email"
                    variant="outlined"
                    sx={{
                      width: '100%',
                      '& .MuiInputBase-input': {
                        fontSize: 14,
                      },
                    }}
                  />
                </Box>

                <Box sx={{ mb: { xs: 3, xl: 4 } }}>
                  <AppTextField
                    type="password"
                    placeholder={messages['common.password']}
                    // label={<IntlMessages id="common.password" />}
                    label="Password"
                    name="password"
                    variant="outlined"
                    sx={{
                      width: '100%',
                      '& .MuiInputBase-input': {
                        fontSize: 14,
                      },
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    mb: { xs: 3, xl: 4 },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Checkbox color="primary" sx={{ ml: -3 }} />
                    <Box
                      component="span"
                      sx={{
                        color: 'grey.500',
                      }}
                    >
                      {/* <IntlMessages id="common.rememberMe" /> */}
                      Remember Me
                    </Box>
                  </Box>
                  <Box
                    component="span"
                    sx={{
                      color: (theme) => theme.palette.primary.main,
                      fontWeight: Fonts.MEDIUM,
                      cursor: 'pointer',
                      display: 'block',
                      textAlign: 'right',
                    }}
                    onClick={onGoToForgetPassword}
                  >
                    {/* <IntlMessages id="common.forgetPassword" /> */}
                    Forget Password?
                  </Box>
                </Box>

                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting}
                    sx={{
                      minWidth: 160,
                      fontWeight: Fonts.REGULAR,
                      fontSize: 16,
                      textTransform: 'capitalize',
                      padding: '4px 16px 8px',
                    }}
                  >
                    {/* <IntlMessages id="common.login" /> */}
                    Login
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Box>

        <Box
          sx={{
            color: 'grey.500',
          }}
        >
          <span style={{ marginRight: 4 }}>
            {/* <IntlMessages id="common.dontHaveAccount" /> */}
            Don't have an account?
          </span>
          <Box
            component="span"
            sx={{
              fontWeight: Fonts.MEDIUM,
              '& a': {
                color: (theme) => theme.palette.primary.main,
                textDecoration: 'none',
              },
            }}
          >
            <Link href="/signup">
              {/* <IntlMessages id="common.signup" /> */}
              Sign Up
            </Link>
          </Box>
        </Box>

        <AppInfoView />
      </Box>
    </AuthWrapper>
  );
};

export default SigninJwtAuth;
