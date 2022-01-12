import React, { useEffect, useState } from 'react';
import ModalContact from '../../component/modal/Modal.component';
import ContactList from '../../component/ContactList/ContactList.component';
import { useDispatch, useSelector } from 'react-redux';
import './list.css';
import Pagination from "react-js-pagination";
import * as actionType from '../../store/action';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const ContactHomeList = () => {
    const [id, setId] = useState('');
    const details = useSelector(state => state.details);
    const message = useSelector(state => state.message);
    const color = useSelector(state => state.color);
    const isLoading = useSelector(state => state.loading);
    const dispatch = useDispatch();
    const [pag, setPag] = useState([]);
    const [show, setShow] = useState(false);
    let [offset, setOffset] = useState(0);
    const detailPerPage = 5;
    const [activePage, setActivePage] = useState(1);
    const toggleContactFormVisiblity = () => {
        setShow(false);
        dispatch(actionType.fetchContact());
    }

    const getpag = React.useCallback(() => {
        setPag(details.slice(offset, offset + detailPerPage));
    }, [details, offset, setPag]);

    useEffect(() => {
        getpag();
    }, [getpag]);

    useEffect(() => {
        dispatch(actionType.fetchContact());
    }, [dispatch]);

    useEffect(() => {
        if (message) {
            color === 'green' ? toast.success(message, { autoClose: 3000 }) : toast.error(message, { autoClose: 10000 })
        }
    }, [color, message]);

    const editHandler = (id) => {
        setShow(true);
        setId(id);
    }


    const handlePageChange = (pageNumber) => {
        let num = pageNumber - 1;
        setOffset(num * detailPerPage);
        setActivePage(pageNumber);
        getpag();
    }

    const updateContact = (detail, id) => {

        dispatch(actionType.updateContact(id, detail));

    }
    const deleteHandler = (id) => {

        dispatch(actionType.deleteContact(id));

    }
    return (
        <div>
            <ContactList isLoading={isLoading} details={pag}
                onEdit={(id) => editHandler(id)} onDelete={(id) => deleteHandler(id)} />
            {show ? <ModalContact id={id} show={show} updateContact={updateContact} modalClosed={toggleContactFormVisiblity} />
                : null}
            <div>
                <Pagination
                    activePage={activePage}
                    itemsCountPerPage={5}
                    totalItemsCount={details.length}
                    pageRangeDisplayed={3}
                    onChange={handlePageChange}
                />
            </div>
        </div>
    );
}

export default ContactHomeList;