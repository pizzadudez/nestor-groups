import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import Modal from 'react-bootstrap/Modal';
import { MyForm } from './MyForm';

import {
  createGroup,
  createPerson,
  updateGroup,
  updatePerson,
} from '../actions';

interface Props {
  show: boolean;
  handleClose: () => void;
  isUpdate: boolean;
  type?: string;
  initialValues?: any;
}

// const stateSelector = createSelector(
// 	(state: State) => state.selectedType,
// 	(state: State) => state.selected,
// 	(selectedType, selected) => ({selectedType, selected})
// )

export const StyledModal: React.FC<Props> = ({
  show,
  handleClose,
  isUpdate,
  type,
  initialValues,
}) => {
  const dispatch = useDispatch();
  // const {selectedType, selected} = useSelector(stateSelector)

  const submitHandler = useCallback(
    (data) => {
      if (isUpdate) {
        if (type === 'group') {
          dispatch(updateGroup(initialValues.id, data));
        } else {
          dispatch(updatePerson(initialValues.id, data));
        }
      } else {
        if (type === 'group') {
          dispatch(createGroup(data));
        } else {
          dispatch(createPerson(data));
        }
      }
      handleClose();
    },
    [dispatch, handleClose, type, isUpdate, initialValues]
  );

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{`${isUpdate ? 'Update' : 'Create'} ${
          type === 'group' ? 'Group' : 'Person'
        }`}</Modal.Title>
      </Modal.Header>
      <MyForm
        isGroup={type === 'group'}
        submitHandler={submitHandler}
        handleClose={handleClose}
        initialValues={initialValues || {}}
      />
    </Modal>
  );
};
