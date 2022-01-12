import { dataApi } from '../../helper/firebase.utils';
import * as action from '../actionTypes';

export const addContactStart = () => {
  return {
    type: action.ADD_CONTACT_START
  }
}

export const addContactSuccess = (msg) => {
  return {
    type: action.ADD_CONTACT,
    msg: msg
  }
}

export const addContactFail = (msg) => {
  return {
    type: action.ADD_CONTACT_FAIL,
    msg: msg
  }
}

export const updateContactSuccess = (msg) => {
  return {
    type: action.UPDATE_CONTACT,
    msg: msg
  }
}

export const updateContactStart = () => {
  return {
    type: action.UPDATE_CONTACT_START
  }
}

export const updateContactFail = (msg) => {
  return {
    type: action.UPDATE_CONTACT_FAIL,
    msg: msg
  }
}

export const deleteContactStart = () => {
  return {
    type: action.REMOVE_CONTACT_START
  }
}

export const deleteContactSuccess = (id, msg) => {
  return {
    type: action.REMOVE_CONTACT,
    id: id,
    msg: msg
  }
}

export const deleteContactFail = (msg) => {
  return {
    type: action.REMOVE_CONTACT_FAIL,
    msg: msg
  }
}

export const fetchContactStart = () => {
  return {
    type: action.GET_CONTACT_START
  }
}

export const fetchContactSuccess = (detail) => {
  return {
    type: action.GET_CONTACT,
    detail: detail
  }
}

export const fetchContactFail = (msg) => {
  return {
    type: action.GET_CONTACT_FAIL,
    msg: msg
  }
}

export const getIdContactStart = () => {
  return {
    type: action.GET_ID_CONTACT_START
  }
}

export const getIdContactSuccess = (detail) => {
  return {
    type: action.GET_ID_CONTACT,
    detail: detail
  }
}

export const getIdContactFail = (msg) => {
  return {
    type: action.GET_ID_CONTACT_FAIL,
    msg: msg
  }
}

export const addContact = (detail) => {
  return dispatch => {
    dispatch(addContactStart());
    var query = `mutation AddContact($input: ContactInput) {
            addContact(input: $input) {
              id
            }
          }`;
    fetch(dataApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: {
          input: detail
        }
      })
    })
      .then(() => {
        const msg = "Your Data Added has been Submitted 👍.";
        dispatch(addContactSuccess(msg));
      })
      .catch((error) => dispatch(addContactFail(error.message)));
  }
}

export const fetchContact = () => {
  return dispatch => {
    dispatch(fetchContactStart());
    var query = `{
            getContacts {
                id
                name
                email
                phone
              }
          }`;
    fetch(dataApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query
      })
    }).then(res => res.json())
      .then((res) => {
        console.log("get", res.data.getContacts);
        dispatch(fetchContactSuccess(res.data.getContacts));
      })
      .catch((error) => dispatch(fetchContactFail(error.message)));
  }
}

export const updateContact = (id, detail) => {
  return dispatch => {
    dispatch(updateContactStart());
    var query = `mutation UpdateContact($id: ID!, $input: ContactInput) {
            updateContact(id: $id, input: $input) {
              id
            }
          }`;
    fetch(dataApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: {
          id: id,
          input: detail
        }
      })
    })
      .then(() => {
        const msg = "Your Data Update has been Submitted 👍.";
        dispatch(updateContactSuccess(msg));
      })
      .catch((error) => dispatch(updateContactFail(error.message)));
  }
}

export const deleteContact = (id) => {
  return dispatch => {
    dispatch(deleteContactStart());
    var query = `mutation DeleteContact($id: ID!) {
            deleteContact(id: $id) {
              id
            }
          }`;
    fetch(dataApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: {
          id: id
        }
      })
    }).then(() => {
      const msg = "Data is Deleting Successfully 👍.";
      dispatch(deleteContactSuccess(id, msg));
    })
      .catch((error) => dispatch(deleteContactFail(error.message)));
  }
}

export const getIdContact = (id) => {
  return dispatch => {
    dispatch(getIdContactStart());
    var query = `query($id: ID!){
            getContact(id: $id) {
              id
              name
              email
              phone
            }
          }`;
    fetch(dataApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: {
          id: id
        }
      })
    }).then(res => res.json())
      .then((res) => {
        dispatch(getIdContactSuccess(res.data.getContact));
      })
      .catch((error) => dispatch(getIdContactFail(error.message)));
  }
}