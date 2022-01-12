import React, { useEffect, useState } from 'react';
import Loading from '../Loading/LoadingIndicator';
import { useDispatch, useSelector } from 'react-redux';
import './Modal.css';
import Aux from '../../hoc/Auxilary/Auxilary';
import Backdrop from '../Backdrop/Backdrop.component';
import * as actionType from '../../store/action/action';


const Modal = (props) => {
  let [name, setName] = useState('');
  let [phone, setPhone] = useState(0);
  let [email, setEmail] = useState('');
  const isLoading = useSelector(state => state.loading);
  const detail = useSelector(state => state.detail);
  const dispatch = useDispatch();


  const [emerror, setEmerror] = useState('');
  const [strerror, setStrerror] = useState('');
  const [numerror, setNumerror] = useState('');

  const handleValid = () => {
    let check = true;
    if (email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) === null) {
      setEmerror("Please Enter The Correct email");
      check = false;
    } else {
      setEmerror('');
    }
    if (name.match(/\b[^\d\W]+\b/g) === null) {
      setStrerror("Please Enter The Correct String");
      check = false;
    } else {
      setStrerror('');
    }
    if (phone.match(/^(\+91[-\s]?)?[0]?(91)?[6789]\d{9}$/g) === null) {
      setNumerror("Please Enter The Correct Number 10 digit (+91 include or not)");
      check = false;
    } else {
      setNumerror('');
    }
    return check;

  }


  useEffect(() => {
    dispatch(actionType.getIdContact(props.id));
  }, [dispatch, props.id]);

  useEffect(() => {
    detail.map((doc) => {
      return (setName(doc.name),
        setEmail(doc.email),
        setPhone(doc.phone)
      );
    })


  }, [detail]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email !== '' && name !== '' && phone !== null) {
      let valid = handleValid();
      console.log(valid);
      if (valid) {
        const detail = {
          email: email,
          name: name,
          phone: Number(phone)
        };
        console.log("up", detail);
        dispatch(actionType.updateContact(props.id, detail));
        dispatch(actionType.fetchContact());
        props.modalClosed();
      }
    }

  };

  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
        className='Modal'
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0'
        }}>
        <div className='head'>
          <h2>Edit Form</h2>
          <p onClick={props.modalClosed} style={{ float: 'right', cursor: 'pointer', padding: '5px' }}>&#10006;</p>
        </div>
        <div >

          {isLoading && <Loading />}
          <form onSubmit={handleSubmit}>
            <div className='control'>
              <label htmlFor='firstName'>Name</label>
              <input
                type="text"
                id="firstName"
                value={name}
                onChange={event => {
                  setName(event.target.value);
                }} />
              {strerror && <p style={{ color: "red" }}>{strerror}</p>}
            </div>
            <div className='control'>
              <label htmlFor='email'>Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={event => {
                  setEmail(event.target.value);
                }} />
              {emerror && <p style={{ color: "red" }}>{emerror}</p>}
            </div>
            <div className='control'>
              <label htmlFor='phone'>Phone</label>
              <input
                type="number"
                id="phone"
                value={phone}
                onChange={event => {
                  setPhone(event.target.value);
                }} />
              {numerror && <p style={{ color: "red" }}>{numerror}</p>}
            </div>
          </form>
        </div>
        <button className="btn btn-secondary" onClick={props.modalClosed}>
          Close
        </button>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Save Changes
        </button>
      </div>
    </Aux>
  );
}

export default Modal;