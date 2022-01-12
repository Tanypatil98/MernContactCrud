import React, { useState, useEffect } from 'react';
import Loading from '../../component/Loading/LoadingIndicator';
import './contact.css';
import { useDispatch, useSelector } from 'react-redux';
import * as actionType from '../../store/action/action';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
const Contact = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState(0);
    const [email, setEmail] = useState('');
    const message = useSelector(state => state.messagead);
    const color = useSelector(state => state.color);
    const isLoading = useSelector(state => state.loading);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email !== '' && name !== '' && phone !== null) {
            let valid = handleValid();

            if (valid) {
                const detail = {
                    email: email,
                    name: name,
                    phone: Number(phone)
                };
                dispatch(actionType.addContact(detail));
                setName('');
                setEmail('');
                setPhone(0);
            }
        } else {
            dispatch(actionType.addContactFail("Please Fill All Deatil in the Form"));
        }

    };

    useEffect(() => {
        if (message) {
            color === 'green' ? toast.success(message, { autoClose: 3000 }) : toast.error(message, { autoClose: 10000 })
        }
    }, [color, message]);

    return (
        <div className="form">
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

                <button type="submit" className="btn" style={{ color: 'blue' }}>Add Contact</button>

            </form>
        </div>
    );
}

export default Contact;