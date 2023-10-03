import React, { Component } from 'react';
import './index.scss'
import MenuAdm from '../componentes/menu-adm'
import CategorySection from '../componentes/categoryBtn';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TitleRange from '../componentes/titleRange/index'
import AdmTicket from '../componentes/admTicket';
import Modal from 'react-modal'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function AdmPage() {
    const [graphicChosen, setGraphicChosen] = useState(1)
    const [menu, setMenu] = useState(1)
    const [showMenu, setShowMenu] = useState(false)
    const [isLogged, setIsLogged] = useState(false)
    const [logOutModal, setLogOutModal] = useState(true)
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const [category, setCategory] = useState(1)
    const [nomeEvento, setNomeEvento] = useState('')
    const [local, setLocal] = useState('')
    const [destaque, setDestaque] = useState(false)
    const [descricao, setDescricao] = useState('')
    const [dtInicio, setDtInicio] = useState('')
    const [dtTermino, setDtTermino] = useState('')


    async function Logar() {

        try {
            const resp = await axios.post('http://localhost:5000/adm/login', {
                email: email,
                senha: senha
            });
            toast.success(`Login efetuado com sucesso, ${email}!`)
            setIsLogged(true)

        } catch (err) {
            toast.error(err.response.data.erro)
        }
    }

    function MenuPage(pagedata) {
        setMenu(pagedata)
        if (pagedata == 5) {
            setLogOutModal(true)
        }
    }

    async function addIngresso() {
        
        try {
            let dados = {
            Categoria:category,
            Empresa:1,
            NomeEvento:nomeEvento,
            Descricao:descricao,
            DataComeco:dtInicio,
            DataFim:dtTermino,
            Destaque:destaque
            }
            console.log(destaque)

            let response = await axios.post('http://localhost:5000/ingresso', dados)
            console.log(response)
        } catch (error) {
            console.error("Erro ao fazer a solicitação:", error);
        }

    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <ToastContainer />
            {
                isLogged
                    ?
                    <section className='adm-main'>
                        <section className='adm-panel'>
                            <MenuAdm f={MenuPage} />
                        </section>
                        <section className='adm-content'>
                            <section className='adm-home'>
                                {menu == 1 &&
                                    <>
                                        <CategorySection funcao={setCategory} valor={category} />
                                        <section className='home-content'>
                                            <TitleRange text='Gráfico de vendas:' />
                                            <div className='home-grafico'>
                                                <img src='../assets/images/grafico.png' />
                                                <div className='grafico-controller'>
                                                    <div onClick={() => setGraphicChosen(1)} style={graphicChosen == 1 ? { backgroundColor: `#520DA9` } : { backgroundColor: `white` }}>
                                                        <div className='title'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                                                <path d="M1.5625 21.875V3.12501C1.5625 2.2629 2.26446 1.5625 3.12501 1.5625H18.75C19.6121 1.5625 20.3125 2.2629 20.3125 3.12501V12.3108L21.875 10.7483V3.12501C21.875 1.39922 20.4758 0 18.75 0H3.12501C1.39922 0 0 1.39922 0 3.12501V21.875C0 23.6008 1.39922 25 3.12501 25H11.7188V23.4375H3.12501C2.26446 23.4375 1.5625 22.7372 1.5625 21.875ZM17.1875 4.68751H4.68751V6.25001H17.1875V4.68751ZM17.1875 7.81252H4.68751V9.37502H17.1875V7.81252ZM17.1875 10.9375H4.68751V12.5H17.1875V10.9375ZM4.68751 15.625H10.9375V14.0625H4.68751V15.625ZM24.5422 14.0625L23.4375 12.9578C23.1323 12.6526 22.7327 12.5 22.3329 12.5C21.9331 12.5 21.5332 12.6526 21.2282 12.9578L14.5203 19.6657C14.2151 19.9707 13.2813 21.151 13.2813 21.5508L12.5 25L15.9485 24.2188C15.9485 24.2188 17.5293 23.285 17.8344 22.9797L24.5422 16.2719C25.1526 15.6617 25.1526 14.6721 24.5422 14.0625ZM17.2836 22.4258C17.1952 22.5098 16.8891 22.7165 16.5153 22.9545L14.4912 20.9305C14.6989 20.6459 14.9299 20.3598 15.0727 20.218L20.1233 15.1674L22.3329 17.377L17.2836 22.4258Z" fill={graphicChosen == 1 ? `white` : `#520DA9`} />
                                                            </svg>
                                                            <h1 style={graphicChosen == 1 ? { color: `white` } : { color: `#520DA9` }}>Total de vendas</h1>
                                                        </div>
                                                        <div className='valor-filtro'>
                                                            <div className='valor' style={graphicChosen == 1 ? { color: `white` } : { color: `#520DA9` }}>
                                                                <p>$35,485</p>
                                                                <span>+2.0%<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                                    <path d="M6.0001 1.79297L9.7072 5.50007L9.0001 6.20717L6.5001 3.70718V10.0001H5.5001V3.70718L3.00007 6.20717L2.29297 5.50007L6.0001 1.79297Z" fill={graphicChosen == 1 ? `white` : `#520DA9`} />
                                                                </svg></span>
                                                            </div>
                                                            <select className='filtro' onClick={() => setGraphicChosen(1)} style={graphicChosen == 1 ? { color: `#520DA9`, backgroundColor: `white` } : { color: `white`, backgroundColor: `#520DA9`, border: `none` }}>
                                                                <option>Semana</option>
                                                                <option>Mês</option>
                                                                <option>Ano</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div onClick={() => setGraphicChosen(2)} style={graphicChosen == 2 ? { backgroundColor: `#520DA9` } : { backgroundColor: `white` }}>
                                                        <div className='title'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                                                <path d="M1.5625 21.875V3.12501C1.5625 2.2629 2.26446 1.5625 3.12501 1.5625H18.75C19.6121 1.5625 20.3125 2.2629 20.3125 3.12501V12.3108L21.875 10.7483V3.12501C21.875 1.39922 20.4758 0 18.75 0H3.12501C1.39922 0 0 1.39922 0 3.12501V21.875C0 23.6008 1.39922 25 3.12501 25H11.7188V23.4375H3.12501C2.26446 23.4375 1.5625 22.7372 1.5625 21.875ZM17.1875 4.68751H4.68751V6.25001H17.1875V4.68751ZM17.1875 7.81252H4.68751V9.37502H17.1875V7.81252ZM17.1875 10.9375H4.68751V12.5H17.1875V10.9375ZM4.68751 15.625H10.9375V14.0625H4.68751V15.625ZM24.5422 14.0625L23.4375 12.9578C23.1323 12.6526 22.7327 12.5 22.3329 12.5C21.9331 12.5 21.5332 12.6526 21.2282 12.9578L14.5203 19.6657C14.2151 19.9707 13.2813 21.151 13.2813 21.5508L12.5 25L15.9485 24.2188C15.9485 24.2188 17.5293 23.285 17.8344 22.9797L24.5422 16.2719C25.1526 15.6617 25.1526 14.6721 24.5422 14.0625ZM17.2836 22.4258C17.1952 22.5098 16.8891 22.7165 16.5153 22.9545L14.4912 20.9305C14.6989 20.6459 14.9299 20.3598 15.0727 20.218L20.1233 15.1674L22.3329 17.377L17.2836 22.4258Z" fill={graphicChosen == 2 ? `white` : `#520DA9`} />
                                                            </svg>
                                                            <h1 style={graphicChosen == 2 ? { color: `white` } : { color: `#520DA9` }}>Avaliação de vendas</h1>
                                                        </div>
                                                        <div className='valor-filtro'>
                                                            <div className='valor' style={graphicChosen == 2 ? { color: `white` } : { color: `#520DA9` }}>
                                                                <p>$35,485</p>
                                                                <span>+2.0%<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                                    <path d="M6.0001 1.79297L9.7072 5.50007L9.0001 6.20717L6.5001 3.70718V10.0001H5.5001V3.70718L3.00007 6.20717L2.29297 5.50007L6.0001 1.79297Z" fill={graphicChosen == 2 ? `white` : `#520DA9`} />
                                                                </svg></span>
                                                            </div>
                                                            <select className='filtro' onClick={() => setGraphicChosen(2)} style={graphicChosen == 2 ? { color: `#520DA9`, backgroundColor: `white` } : { color: `white`, backgroundColor: `#520DA9`, border: `none` }}>
                                                                <option>Semana</option>
                                                                <option>Mês</option>
                                                                <option>Ano</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div onClick={() => setGraphicChosen(3)} style={graphicChosen == 3 ? { backgroundColor: `#520DA9` } : { backgroundColor: `white` }}>
                                                        <div className='title'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                                                <path d="M1.5625 21.875V3.12501C1.5625 2.2629 2.26446 1.5625 3.12501 1.5625H18.75C19.6121 1.5625 20.3125 2.2629 20.3125 3.12501V12.3108L21.875 10.7483V3.12501C21.875 1.39922 20.4758 0 18.75 0H3.12501C1.39922 0 0 1.39922 0 3.12501V21.875C0 23.6008 1.39922 25 3.12501 25H11.7188V23.4375H3.12501C2.26446 23.4375 1.5625 22.7372 1.5625 21.875ZM17.1875 4.68751H4.68751V6.25001H17.1875V4.68751ZM17.1875 7.81252H4.68751V9.37502H17.1875V7.81252ZM17.1875 10.9375H4.68751V12.5H17.1875V10.9375ZM4.68751 15.625H10.9375V14.0625H4.68751V15.625ZM24.5422 14.0625L23.4375 12.9578C23.1323 12.6526 22.7327 12.5 22.3329 12.5C21.9331 12.5 21.5332 12.6526 21.2282 12.9578L14.5203 19.6657C14.2151 19.9707 13.2813 21.151 13.2813 21.5508L12.5 25L15.9485 24.2188C15.9485 24.2188 17.5293 23.285 17.8344 22.9797L24.5422 16.2719C25.1526 15.6617 25.1526 14.6721 24.5422 14.0625ZM17.2836 22.4258C17.1952 22.5098 16.8891 22.7165 16.5153 22.9545L14.4912 20.9305C14.6989 20.6459 14.9299 20.3598 15.0727 20.218L20.1233 15.1674L22.3329 17.377L17.2836 22.4258Z" fill={graphicChosen == 3 ? `white` : `#520DA9`} />
                                                            </svg>
                                                            <h1 style={graphicChosen == 3 ? { color: `white` } : { color: `#520DA9` }}>Bruto de vendas</h1>
                                                        </div>
                                                        <div className='valor-filtro'>
                                                            <div className='valor' style={graphicChosen == 3 ? { color: `white` } : { color: `#520DA9` }}>
                                                                <p>$35,485</p>
                                                                <span>+2.0%<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                                    <path d="M6.0001 1.79297L9.7072 5.50007L9.0001 6.20717L6.5001 3.70718V10.0001H5.5001V3.70718L3.00007 6.20717L2.29297 5.50007L6.0001 1.79297Z" fill={graphicChosen == 3 ? `white` : `#520DA9`} />
                                                                </svg></span>
                                                            </div>
                                                            <select className='filtro' onClick={() => setGraphicChosen(3)} style={graphicChosen == 3 ? { color: `#520DA9`, backgroundColor: `white` } : { color: `white`, backgroundColor: `#520DA9`, border: `none` }}>
                                                                <option>Semana</option>
                                                                <option>Mês</option>
                                                                <option>Ano</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </section>
                                    </>
                                }
                                {menu == 2 &&
                                    <>
                                        <section className='search-content'>
                                            <div className='input-div'>
                                                <img src='../assets/images/search.png' />
                                                <input type='text' placeholder='Ex: Numanice, The town...' />
                                            </div>
                                            <div className='ticket-wrapper'>
                                                <AdmTicket />
                                                <AdmTicket />
                                                <AdmTicket />
                                                <AdmTicket />
                                            </div>
                                        </section>
                                    </>
                                }
                                {menu == 3 &&
                                    <>
                                        <section className='add-content'>
                                            <div className='category-range'>
                                                <TitleRange text='Categorias' />
                                                <CategorySection funcao={setCategory} valor={category} />
                                            </div>
                                            <div className='add-range'>
                                                <TitleRange text='Informações do evento' />
                                                <div className='add-input-main'>
                                                    <div className='file-input-box'>
                                                        <input type='file' />
                                                    </div>
                                                    <div className='divisor'></div>
                                                    <div className='text-inputs-box' >
                                                        <div className='text-input-box'>
                                                            <input type='text' placeholder='Nome do Evento' value={nomeEvento} onChange={(e) => setNomeEvento(e.target.value)} />
                                                        </div>
                                                        <div className='text-input-box'>
                                                            <input type='text' placeholder='Local' value={local} onChange={(e) => setLocal(e.target.value)} />
                                                            <img src='' />
                                                        </div>
                                                        <div className='text-input-box'>
                                                            <input type='datetime-local' placeholder='Data e Hora de Início' value={dtInicio} onChange={(e) => setDtInicio(e.target.value)} />
                                                        </div>
                                                        <div className='text-input-box'>
                                                            <input type='datetime-local' placeholder='Data e Hora de Termino' value={dtTermino} onChange={(e) => setDtTermino(e.target.value)} />
                                                        </div>
                                                        <div className='text-input-box'>
                                                            <input type='text' placeholder='Adicionar descrição' value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                                                        </div>
                                                        <div>
                                                            <input type='radio' name={destaque} value={true} onChange={(e) => setDestaque(e.target.value)} />
                                                            <label>Sim</label>
                                                        </div>
                                                        <div>
                                                            <input type='radio' name={destaque} value={false} onChange={(e) => (e.target.value)} />
                                                            <label>Não</label>
                                                        </div>
                                                        <button onClick={() => addIngresso()}>Adicionar ingresso</button>
                                                    </div>
                                                    <div className='divisor'></div>
                                                    <div className={showMenu ? 'type-controller-clicked' : 'type-controller'} onClick={() => setShowMenu(!showMenu)}>
                                                        <div className='header'>
                                                            <h1>Tipos de ingresso, quantidade e preço</h1>
                                                            <img src='../assets/images/arrow.svg' />
                                                        </div>
                                                        <div className='body'>
                                                            <div className='input-row'>
                                                                <input type='text' placeholder='Nome' />
                                                                <input type='text' placeholder='Qtd' />
                                                                <input type='text' placeholder='R$ 0,00' />
                                                                <a>Adicionar</a>
                                                            </div>
                                                            <div className='body-table'>
                                                                <div className='body-table-row'>
                                                                    <span>Front Stage</span>
                                                                    <span>15 Un</span>
                                                                    <div className='divisor'></div>
                                                                    <span>R$ 150,00</span>
                                                                    <a>Remover</a>
                                                                    <a>Alterar</a>
                                                                </div>
                                                                <div className='body-table-row'>
                                                                    <span>Camarote</span>
                                                                    <span>15 Un</span>
                                                                    <div className='divisor'></div>
                                                                    <span>R$ 150,00</span>
                                                                    <a>Remover</a>
                                                                    <a>Alterar</a>
                                                                </div>
                                                                <div className='body-table-row'>
                                                                    <span>Pista</span>
                                                                    <span>15 Un</span>
                                                                    <div className='divisor'></div>
                                                                    <span>R$ 150,00</span>
                                                                    <a>Remover</a>
                                                                    <a>Alterar</a>
                                                                </div>
                                                                <div className='body-table-row'>
                                                                    <span>VIP</span>
                                                                    <span>15 Un</span>
                                                                    <div className='divisor'></div>
                                                                    <span>R$ 150,00</span>
                                                                    <a>Remover</a>
                                                                    <a>Alterar</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </>
                                }
                                {menu == 5 &&
                                    <Modal
                                        className={'modal'}
                                        overlayClassName={'overlay-modal'}
                                        isOpen={logOutModal}
                                        shouldCloseOnOverlayClick={() => setLogOutModal(!logOutModal)}
                                        closeTimeoutMS={500}
                                    >
                                        <section className='logout-modal-content'>
                                            <h1>Você tem certeza que deseja sair?</h1>
                                            <a onClick={() => setIsLogged(false)}>Sim</a>
                                        </section>
                                    </Modal>
                                }

                            </section>
                        </section>
                    </section >
                    :

                    <div className='adm-login'>
                        <div className='container'>
                            <div className="forms-container">
                                <div className="signin-signup">
                                    <div action="#" className="sign-in-form">
                                        <h2 className="title">Entrar</h2>
                                        <div className="input-field">
                                            <i className="fas fa-user"></i>
                                            <input type="text" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                        <div className="input-field">
                                            <i className="fas fa-lock"></i>
                                            <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
                                        </div>
                                        <input type="submit" value="Entrar" className="btn solid" onClick={Logar} />
                                    </div>

                                </div>
                            </div>
                            <div className="panels-container">
                                <div className="panel left-panel">
                                    <div className="content">
                                        <h3>Bem-vindo ao Painel do Administrador</h3>
                                        <p>Este é o centro de controle, onde você tem o poder de moldar a experiência dos visitantes do site.</p>
                                    </div>
                                    <img src="./assets/images/log.svg" className="image" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    );
}