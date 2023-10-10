import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import LandingPage from './landingpage/index.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdmPage from './adm';
import Empresa from './empresa/index'
import Pix from '../src/tp-pagamentos/Pix/pix.js';
import PixQRcode from '../src/tp-pagamentos/Pix-QRcode/pixQRcode.js';
import Boleto from '../src/tp-pagamentos/Boleto/boleto.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<LandingPage/>}/>
            <Route path='/adm' element={<AdmPage/>}/>
            <Route path='/empresa' element={<Empresa/>}/>
            <Route path='/pix' element={< Pix/>}/>
            <Route path='/qrcode' element={<PixQRcode/>}/>
            <Route path='/boleto' element={<Boleto/>}/>
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);
