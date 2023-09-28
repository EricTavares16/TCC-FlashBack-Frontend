
import { useState } from 'react';
import './header.scss'
import Modal from 'react-modal'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Header() {
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false)
    const [isLogged, setIsLogged] = useState(true)

// Variáveis de Cadastro do usuário

    const [NomeUsuario, setNomeUsuario] = useState('');
    const [cpfUsuario, setcpfUsuario] = useState('');
    const [emailUsuario, setemailUsuario] = useState('');
    const [senhaUsuario, setsenhaUsuario] = useState();

// Variáveis de Login do usuário
    const [usuario, setUsuario] = useState('')
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

// Variáveis de abertura de modal

    const [handleMenu, toggle] = useState(false)
    const [userModal, setUserModal] = useState(true)
    const [userPopUp, setUserPopUp] = useState(false)

// Funções para modivicação de estado de modal
    function Sair(){
        setIsLogged(false)
        setUserModal(false)
    }
    function FecharPopUp(){
        setUserModal(!userModal)
        setUserPopUp(!userPopUp)
    }
// Função para modificação da barra de usuário
    const [userBar,setUserBar] = useState(false)
    const [userRightBar,setUserRightBar] = useState(false)
    function UserBarLeft(){
        setUserBar(true)
        setUserRightBar(true)
    }
    function UserBarRight(){
        setUserBar(false)
        setUserRightBar(false)
    }
// Função de cadastro com API
    async function CadastrarCliente () {
        try {

            let cliente = {

                NomeUsuario: NomeUsuario, 
                CPF: cpfUsuario,
                Email: emailUsuario,
                Senha: senhaUsuario

            }
            console.log(cliente)

            const r = await axios.post('http://localhost:5000/cliente', cliente)
            toast.success(`Cadastro realizado com sucesso!`)
            toggle(false)
        
            setNomeUsuario('')
            setemailUsuario('')
            setcpfUsuario('')
            setsenhaUsuario('')

        } catch (err) {
            toast.error(err.response.data.erro)
        }
    }

// Função de Login com API
    async function Logar() {

        try {
            const resp = await axios.post('http://localhost:5000/cliente/login', {
                NomeUsuario: email,
                cpf: email,
                email: email,
                senha: senha
            });

            setUsuario(resp.data.NM_USUARIO)
            toast.success(`Seja bem-vindo, ${resp.data.NM_USUARIO} !`)
            setIsLogged(true)
            setShowModal(false)
            setUserPopUp(false)

        } catch (err) {
            toast.error(err.response.data.erro)
        }

    }

    return (
        <section className='header-main'>
            <ToastContainer />
            <section className="secao-header">
                <img src='/assets/images/logoTCC.png' />
                <div className='secao-header-input-div'>
                    <img src='/assets/images/lupa.svg' />
                    <input type='text' placeholder='Pesquisar eventos, shows, teatros, festas...' />
                </div>
                <div className='secao-header-menu'>
                    <div className='menu-select'>
                        <img src='/assets/images/local.svg' />
                        <select>
                            <option>Escolha um local</option>
                            <option>Map-api</option>
                        </select>
                    </div>
                    <div className='menu-carrinho'>
                        <img src='/assets/images/carrinho.svg' />
                        <span>0</span>
                    </div>
                    {isLogged
                        ?   <>
                            <div className='user-div'>
                                <div className='user' onClick={() => setUserPopUp(!userPopUp)}>
                                    <i className="fas fa-user"></i>
                                    <a>{usuario}</a>
                                </div>
                                <div className='user-option' style={userPopUp ? {display:'flex'} : {display: 'none'}}>
                                    <div className='baloon'></div>
                                    <div className='user-option-row' onClick={() => FecharPopUp()}
                                    >
                                        <img src='./assets/images/info.svg'/>
                                        <a>Informações da conta</a>
                                    </div>
                                    <div className='user-option-row' onClick={() => Sair()}>
                                        <img src='./assets/images/sair.svg'/>
                                        <a>Sair</a>
                                    </div>
                                </div>
                            </div>
                            
                            </>

                            : <a onClick={() => setShowModal(!showModal)}>Entrar</a>
                    }
                        </div>

            </section>
            <Modal
                className="modal"
                overlayClassName="modal-overlay"
                closeTimeoutMS={500}
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
            >
                <div className='adm-login'>
                    <div className={handleMenu ? 'sign-up-mode' : 'container'}>
                        <div className="forms-container">
                            <div className="signin-signup">
                                <div className="sign-in-form">
                                    <h2 className="title">Entrar</h2>
                                    <div className="input-field">
                                        <i className="fas fa-user"></i>
                                        <input type="text" placeholder="Usuário, E-mail ou CPF" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="input-field">
                                        <i className="fas fa-lock"></i>
                                        <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
                                    </div>
                                    <input type="submit" value="Fazer Login" className="btn solid" onClick={Logar} />
                                    <p className="social-text">Ou entre com suas redes sociais.</p>
                                    <div className="social-media">
                                        <a className="social-icon">
                                            <i className="fab fa-facebook-f"></i>
                                        </a>
                                        <a className="social-icon">
                                            <i className="fab fa-twitter"></i>
                                        </a>
                                        <a className="social-icon">
                                            <i className="fab fa-google"></i>
                                        </a>
                                        <a className="social-icon">
                                            <i className="fab fa-linkedin-in"></i>
                                        </a>
                                    </div>
                                </div>
                                <div className="sign-up-form">
                                    <h2 className="title">Cadastre-se</h2>
                                    <div className="input-field">
                                        <i className="fas fa-user"></i>
                                        <input type="text" placeholder="Usuário"  value={NomeUsuario}  onChange={e => setNomeUsuario(e.target.value)}/>
                                    </div>
                                    <div className="input-field">
                                        <i className="fas fa-envelope"></i>
                                        <input type="email" placeholder="E-mail" value={emailUsuario}  onChange={e => setemailUsuario(e.target.value)}/>
                                    </div>
                                    <div className="input-field">
                                        <i className="fas fa-envelope"></i>
                                        <input type="text" placeholder="CPF"  value={cpfUsuario}  onChange={e => setcpfUsuario(e.target.value)}/>
                                    </div>
                                    <div className="input-field">
                                        <i className="fas fa-lock"></i>
                                        <input type="password" placeholder="Senha" value={senhaUsuario}  onChange={e => setsenhaUsuario(e.target.value)}/>
                                    </div>
                                    <input type="submit" className="btn" value="Cadastre-se" onClick={CadastrarCliente}/>
                                    <p className="social-text">Ou cadastre-se com suas redes sociais</p>
                                    <div className="social-media">
                                        <a className="social-icon">
                                            <i className="fab fa-facebook-f"></i>
                                        </a>
                                        <a className="social-icon">
                                            <i className="fab fa-twitter"></i>
                                        </a>
                                        <a className="social-icon">
                                            <i className="fab fa-google"></i>
                                        </a>
                                        <a className="social-icon">
                                            <i className="fab fa-linkedin-in"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="panels-container">
                            <div className="panel left-panel">
                                <div className="content">
                                    <h3>Não tem cadastro?</h3>
                                    <p>Cadastre-se e inicie sua jornada conosco.</p>
                                    <button className="btn transparent" id="sign-up-btn" onClick={() => toggle(true)}>Cadastre-se</button>
                                </div>
                                <img src="./assets/images/log.svg" className="image" alt="" />
                            </div>
                            <div className="panel right-panel">
                                <div className="content">
                                    <h3>Já tem cadastro?</h3>
                                    <p>Faça login com suas informações de acesso.</p>
                                    <button className="btn transparent" id="sign-in-btn" onClick={() => toggle(false)}>
                                        Entrar
                                    </button>
                                </div>
                                <img src="./assets/images/register.svg" className="image" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            <Modal
                className="modal"
                overlayClassName="modal-overlay"
                closeTimeoutMS={500}
                isOpen={userModal}
                onRequestClose={() => setUserModal(false)}
            >
                <section className='user-modal-main'>
                    <section className='user-option-select'>
                        <div className='user-option' onClick={() => UserBarLeft()}>
                            <i class="fas fa-paste"></i>
                            <a>Meus Pedidos</a>
                        </div>
                        <div className='user-option' onClick={() => UserBarRight()}>
                            <i className="fas fa-user"></i>
                            <a>Informações da Conta</a>
                        </div>
                        <div className={userBar ? 'bar-left' : 'bar-right'}></div>
                    </section>
                    {userRightBar
                    ?
                    <section className='left-side'>Esquerda</section>
                    :
                    <section className='right-side'>
                        <section className='info-part'>
                            <h1>Dados Pessoais</h1>
                            <div className='info-form-div'>
                                <div className='info-input-div'>
                                    <label>Nome </label>
                                    <input type='text'/>
                                </div>
                                <div className='info-input-div'>
                                    <label>Sobrenome</label>
                                    <input type='text'/>
                                </div>
                                <div className='info-input-div'>
                                    <label>Data de nascimento</label>
                                    <input type='date'/>
                                </div>
                                <div className='info-input-div'>
                                    <label>Genêro</label>
                                    <input type='text'/>
                                </div>
                                <div className='info-input-div'>
                                    <label>Celular</label>
                                    <input type='tel'/>
                                </div>
                                <div className='info-input-div'>
                                    <label>CPF</label>
                                    <input type='text'/>
                                </div>
                            </div>
                            <h1>Dados de Login</h1>
                            <div className='info-form-div'>
                                <div className='info-input-div'>
                                    <label>E-mail</label>
                                    <input type='email'/>
                                </div>
                                <div className='info-input-div'>
                                    <label>Senha</label>
                                    <input type='text'/>
                                </div>
                            </div>
                        </section>
                    </section>
                    }
                </section>
            </Modal>

        </section>
    );
}