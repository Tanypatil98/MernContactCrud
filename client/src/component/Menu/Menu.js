import React from 'react';
import { NavLink } from 'react-router-dom';


const Menu = () => {
    return (
        <div className='contact' >
            <header>
                <nav>
                    <ul>
                        <li><NavLink
                            to="/add_contact"
                            exact
                            activeClassName="my-active"
                            activeStyle={{
                                color: 'blue',
                                overflow: 'hidden'
                            }}><h2>Add Contact Detail</h2></NavLink></li>
                        <li><NavLink to="/contact_list"><h2>View Contact List</h2></NavLink></li>
                    </ul>
                </nav>
            </header>
        </div>
    );
}

export default Menu;