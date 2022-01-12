import { routes } from '../shared/constants';

import HomePage from './Home/HomePage.component';
import AddContactPage from './contact/contact.component';
import ContactHomeList from './List/list.component';

// eslint-disable-next-line
export default {
	[routes.homepage]: HomePage,
	[routes.add_contact]: AddContactPage,
	[routes.contact_list]: ContactHomeList,
};