import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import '../styles/pages/idea.css';
import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";
import { useParams } from 'react-router-dom'


interface Idea {
  latitude: number
  longitude: number
  name: string
  about: string
  number: string
  instructions: string
  opening_hours: string
  open_on_weekends: string
  images: Array<{
    id: number
    url: string
  }>
}

interface IdeaParams {
  id: string
}

export default function Idea() {
  const params = useParams<IdeaParams>()
  const [Idea, setIdea] = useState<Idea>()
  const [activeImageIndex, setActiveImageIndex] = useState(0)


  useEffect(() => {
    api.get(`Ideas/${params.id}`).then(response => {
      setIdea(response.data)
    })
  }, [params.id])

  if (!Idea) {
    return <p>Carregando...</p>
  }

  return (
    <div id="page-Idea">

      <Sidebar />

      <main>
        <div className="Idea-details">
          <img src={Idea.images[activeImageIndex].url} alt={Idea.name} />

          <div className="images">
            {Idea.images.map((image, index) => {
              return (
                <button 
                key={image.id} 
                className={activeImageIndex === index ? 'active' : ''} 
                type="button"
                onClick={() => {
                  setActiveImageIndex(index)
                }}
                
                >
                  <img src={image.url} alt={Idea.name} />
                </button>
              )
            })}

          </div>

          <div className="Idea-details-content">
            <h1>{Idea.name}</h1>
            <p>{Idea.about}</p>

            <div className="map-container">
              <Map
                center={[Idea.latitude, Idea.longitude]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={mapIcon} position={[Idea.latitude, Idea.longitude]} />
              </Map>

              <footer>
                <a target="_blank" rel="noreferrer" href=
                  {`https://www.google.com/maps/dir/?api=1&destination=${Idea.latitude},${Idea.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{Idea.instructions}.</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {Idea.opening_hours}
              </div>

              {Idea.open_on_weekends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                Atendemos <br />
                fim de semana
                </div>
              ) : (
                  <div className="open-on-weekends dont-open">
                    <FiInfo size={32} color="#ff669d" />
                Não Atendemos <br />
                fim de semana
                  </div>
                )}


            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}