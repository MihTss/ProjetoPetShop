import { BrowserRouter as Router } from 'react-router-dom';

import Navbar from './components/Navbar/index';
import Footer from './components/Footer/index';
import RoutesConfig from './routesConfig';

function App() {
  return (
    <Router>    
        <Navbar />
        <RoutesConfig />
        <Footer />
    </Router>
  );
}

export default App;
