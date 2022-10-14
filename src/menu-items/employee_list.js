// assets
import { UserOutlined } from '@ant-design/icons';
// icons
const icons = {
    UserOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const employee_list = {
    id: 'group-hr',
    type: 'group',
    children: [
        {
            id: 'hr',
            title: 'HR',
            type: 'item',
            url: '/employees',
            icon: icons.UserOutlined,
            breadcrumbs: false
        }
    ]
};

export default employee_list;
