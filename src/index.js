import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';


import Ladingpage from './ladingpage/index.js';
import Rodape from './componentes/rodape/index.js'
import MenuAdm from './componentes/menu-adm/index.js';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
            
            <Route path='/' element={<Ladingpage/>}/>
            <Route path='/rodape' element={<Rodape/>}/>
            <Route path='/admR' element={<MenuAdm/>}/>

        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);
