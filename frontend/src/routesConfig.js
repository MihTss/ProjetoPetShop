import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Detalhes from './pages/Detalhes';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';

export default function RoutesConfig() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/produto/:id' element={<Detalhes />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/login' element={<Login />} />
            <Route path='/cadastro' element={<Cadastro />} />
            <Route path='*' element={<h1>Página Não Encontrada!</h1>} />
        </Routes>
    );
}