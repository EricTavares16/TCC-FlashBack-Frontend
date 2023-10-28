import BoxCity from '../componentes/boxCity';
import { Header } from '../componentes/header/header';
import Rodape from '../componentes/rodape';
import TitleTag from '../componentes/titleTag';
import { TrianguloCategoria } from '../componentes/trianguloCategoria';
import BoxIngresso from '../componentes/boxIngresso'
import './index.scss';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import Glider from 'react-glider';
import "glider-js/glider.min.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules'
import DestaqueBox from '../componentes/destaquesBox';

function LandingPage() {

  const [listarCategoria, setListarCategoria] = useState([])
  const [listarDestaque,setListarDestaque] = useState([])

  async function ListarCategorias () {

   const nomeCategorias = [];
   const listagem = []; 
   let r =  await axios.get('http://localhost:5000/categoria')

   for (let cont = 0; cont < r.data.length; cont++) {

    nomeCategorias[cont] = r.data[cont].NM_CATEGORIA_INGRESSO

   }


   for (let item of nomeCategorias) {

    r = await axios.get(`http://localhost:5000/ingresso/categoria?categoria=${item}`)
    listagem.push(r)

   }
   
  
   setListarCategoria(listagem)

  }
  async function ListarDestaques () {
    let listagem = []
    let r =  await axios.get('http://localhost:5000/ingresso/destaque')
    listagem = [r.data]
    setListarDestaque(...listagem)
    console.log(listarDestaque)
 
  }
  useEffect(() => {
    ListarDestaques();
  }, []);
  useEffect(() => {
    console.log(listarDestaque);
  }, [listarDestaque]);
  useEffect(() => {
    ListarCategorias();
  }, []);
  

  const [handleCarrosel, toggle] = useState(0)

  return (
    <div className="body">
      <Header/>
      <section className='secao-01'>
        <h1>Explore e viva a diversão!</h1>
        <div className='secao-01-categoria'>
          <TrianguloCategoria 
            src='./assets/images/teatro.svg' 
            text='Teatros e espetáculos'
          />
          <TrianguloCategoria 
            src='./assets/images/junina.svg' 
            text='Festas Juninas'
          />
          <TrianguloCategoria 
            src='./assets/images/agenda.svg' 
            text='Festas e shows'
          />
          <TrianguloCategoria 
            src='./assets/images/palestra.svg' 
            text='Palestras e congressos'
          />
          <TrianguloCategoria 
            src='./assets/images/balao.svg' 
            text='Infantil'
          />
        </div>
      </section>
      <div className='main-faixa-eventos'>
        <h1>Eventos em Destaque</h1>
      </div>
      <section className='secao-02'>
        <Swiper
          effect='coverflow'
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView='auto'
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          pagination={{el: '.swiper-pagination', clickable: true}}
          modules={[EffectCoverflow,Pagination,Autoplay]}
          className='swiper-container'
        >
          {listarDestaque.map(item =>
            <SwiperSlide className='swiper-slide'>
              <DestaqueBox
                nome={item.DS_EVENTO}
                cidade={item.DS_LOCALIDADE}
                uf={item.DS_UF}
                data={item.DT_COMECO}
                imagem={item.IMAGEM_INGRESSO}
                endereco={item.DS_LOGRADOURO}
                id={item.ID_INGRESSO}
              />
            </SwiperSlide>
          )}
        </Swiper>
        <div className='slider-controller'>
          <div className='swiper-pagination'></div>
        </div>
      </section>
      <section className='secao-03'>
        <TitleTag className='titletag' text='Explore o país!'/>
        <div className='secao-03-carrosel-cidade'>
          <div className='carrosel-cidade'>
            <Glider
              iconLeft='‹'
              iconRight='›'
              draggable
              hasArrows
              hasDots
              slidesToShow={5}
              slidesToScroll={5}
            >
              <BoxCity city='São Paulo' src='./assets/images/sp.png' uf='sp'/>
              <BoxCity city='Bahia' src='./assets/images/salvador.png' uf='ba'/>
              <BoxCity city='Rio Grande do Sul' src='./assets/images/porto.png' uf='rs'/>
              <BoxCity city='Belo Horizonte' src='./assets/images/bh.png' uf='bh'/>
              <BoxCity city='Rio de Janeiro' src='./assets/images/rio.png' uf='rj'/>
            </Glider>
          </div>
        </div>
        
        {listarCategoria && 
            listarCategoria.map((item, index) => (
                <>
                  <TitleTag className='titletag' text={item.data[0].NM_CATEGORIA_INGRESSO} />
                  <div className='secao-03-carrosel'  >
                    <Glider
                      iconLeft='‹'
                      iconRight='›'
                      draggable
                      hasArrows
                      hasDots
                      slidesToShow={5}
                      slidesToScroll={5}
                    >
                      {item.data.map((item,index) => (
                        <BoxIngresso nome={item.NM_EVENTO} data={item.DT_COMECO} imagem={item.IMAGEM_INGRESSO} logradouro={item.DS_LOGRADOURO} cidade={item.DS_LOCALIDADE} uf={item.DS_UF} id={item.ID_INGRESSO} num={item.DS_NUM}/>
                      ))}
                    </Glider>
                  </div>
                  
                </>
            ))}
      </section>
      <Rodape/>
    </div>
  );
}

export default LandingPage; 
