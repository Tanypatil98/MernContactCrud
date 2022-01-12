import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './home.css'

toast.configure();

const HomePage = () => {
    useEffect(() => {
        toast.info("Please Select Any One Option", { position: toast.POSITION.BOTTOM_CENTER });
    }, []);

    return (
    <div className='contact' />
    );
}

export default HomePage;