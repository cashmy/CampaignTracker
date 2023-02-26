import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
// import IntlMessages from '@crema/helpers/IntlMessages';
import PropTypes from 'prop-types';
import AddPlayerForm from './AddPlayerForm';
import AppDialog from '@/../../lib/components/AppDialog';
import { useInfoViewActionsContext } from '@/../../lib/context/AppContextProvider/InfoViewContextProvider';
// import { postDataApi, putDataApi } from '@@/../../lib/hooks/APIHooks';
import { usePlayerActionsContext } from '../PlayersContextProvider';

const validationSchema = yup.object({
  // name: yup.string().required(<IntlMessages id="validation.nameRequired" />),
  name: yup.string().required("Please enter name!"),
  email: yup
    .string()
    // .email(<IntlMessages id="validation.emailFormat" />)
    // .required(<IntlMessages id="validation.emailRequired" />),
    .email("The Email you entered is not a valid format!")
    .required("Please enter Email Address!"),
  Player: yup
    .string()
    // .required(<IntlMessages id="validation.phoneNumberRequired" />),
    .required("Please enter phone number!"),
});

const CreatePlayer = (props) => {
  const {
    isAddPlayer,
    handleAddPlayerClose,
    selectPlayer,
    onUpdatePlayer,
  } = props;
  // const infoViewActionsContext = useInfoViewActionsContext();
  // const { reCallAPI } = usePlayerActionsContext();

  const [userImage, setUserImage] = useState(
    selectPlayer && selectPlayer.image
      ? selectPlayer.image
      : '/assets/images/placeholder.jpg'
  );
  useEffect(() => {
    setUserImage(
      selectPlayer && selectPlayer.image
        ? selectPlayer.image
        : '/assets/images/placeholder.jpg'
    );
  }, [selectPlayer]);

  return (
    <AppDialog
      fullHeight
      open={isAddPlayer}
      onClose={() => handleAddPlayerClose()}
    >
      <Formik
        validateOnChange={true}
        initialValues={{
          name: selectPlayer ? selectPlayer.name : '',
          email: selectPlayer ? selectPlayer.email : '',
          Player: selectPlayer ? selectPlayer.Player : '',
          birthday:
            selectPlayer && selectPlayer.birthday
              ? selectPlayer.birthday
              : null,
          website:
            selectPlayer && selectPlayer.website ? selectPlayer.website : '',
          company:
            selectPlayer && selectPlayer.company ? selectPlayer.company : '',
          address:
            selectPlayer && selectPlayer.address ? selectPlayer.address : '',
          facebookId:
            selectPlayer && selectPlayer.facebookId
              ? selectPlayer.facebookId
              : '',
          twitterId:
            selectPlayer && selectPlayer.twitterId
              ? selectPlayer.twitterId
              : '',
          notes:
            selectPlayer && selectPlayer.notes ? selectPlayer.notes : '',
          label:
            selectPlayer && selectPlayer.label ? selectPlayer.label : '',
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          if (selectPlayer) {
            const newPlayer = {
              id: selectPlayer.id,
              isStarred: selectPlayer.isStarred,
              isFrequent: selectPlayer.isFrequent,
              image: userImage,
              ...data,
            };
            alert('Updating Player');
            // putDataApi('/api/PlayerApp/Player/', infoViewActionsContext, {
            //   Player: newPlayer,
            // })
            //   .then(() => {
            //     reCallAPI();
            //     infoViewActionsContext.showMessage(
            //       'Player updated successfully!'
            //     );
            //   })
            //   .catch((error) => {
            //     infoViewActionsContext.fetchError(error.message);
            //   });
            onUpdatePlayer(newPlayer);
          } else {
            const newPlayer = {
              id: Math.floor(Math.random() * 1000),
              isStarred: false,
              isFrequent: Math.random() > 0.5,
              image: userImage,
              ...data,
            };
            alert('Creating new Player');
            // postDataApi('/api/PlayerApp/compose', infoViewActionsContext, {
            //   Player: newPlayer,
            // })
            //   .then(() => {
            //     reCallAPI();
            //     infoViewActionsContext.showMessage(
            //       'Player created successfully!'
            //     );
            //   })
            //   .catch((error) => {
            //     infoViewActionsContext.fetchError(error.message);
            //   });
          }
          handleAddPlayerClose();
          resetForm();
          setSubmitting(false);
        }}
      >
        {({ values, setFieldValue }) => (
          <AddPlayerForm
            setUserImage={setUserImage}
            userImage={userImage}
            values={values}
            setFieldValue={setFieldValue}
            handleAddPlayerClose={handleAddPlayerClose}
          />
        )}
      </Formik>
    </AppDialog>
  );
};

export default CreatePlayer;

CreatePlayer.defaultProps = {
  selectPlayer: null,
};

CreatePlayer.propTypes = {
  isAddPlayer: PropTypes.bool.isRequired,
  handleAddPlayerClose: PropTypes.func.isRequired,
  selectPlayer: PropTypes.object,
  onUpdatePlayer: PropTypes.func,
};
