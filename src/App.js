// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import axios from 'axios';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //
// axios.defaults.withCredentials = true;
//axios.defaults.baseURL = 'http://192.168.0.121/hrms/public/api/';
// axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers.post['Accept'] = 'application/json';

const App = () => (
    <ThemeCustomization>
        <ScrollTop>
            <Routes />
        </ScrollTop>
    </ThemeCustomization>
);

export default App;
