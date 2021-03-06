import React, { useState, FormEvent, ChangeEvent } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { FiPlus } from "react-icons/fi";
import '../styles/pages/create-idea.css';
import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import api from "../services/api"

import { LeafletMouseEvent } from "leaflet"
import { useHistory } from "react-router-dom";

export default function CreateIdea() {

  const history = useHistory()

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 })
  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [number, setNumber] = useState('')
  const [images, setImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])


  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng

    setPosition({
      latitude: lat,
      longitude: lng
    })

  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return
    }

    const selectedImages = Array.from(event.target.files)
    setImages(selectedImages)

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image)
    })
    setPreviewImages(selectedImagesPreview)

  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const { latitude, longitude } = position

    const data = new FormData()

    data.append('name', name)
    data.append('about', about)
    data.append('latitude', String(latitude))
    data.append('longitude', String(longitude))
    data.append('instructions', String(longitude))
    data.append('opening_hours', String(longitude))
    data.append('open_on_weekends', String(longitude))
    
    

    
    
    images.forEach(image => {
      data.append('images', image)
    })

    await api.post('Ideas', data)

    alert('Cadastro realizado com sucesso')
    history.push('/app')

  }

  return (
    <div id="page-create-Idea">

      <Sidebar />


      <main>
        <form onSubmit={handleSubmit} className="create-Idea-form">
          <fieldset>
            <legend>Criar Ideia</legend>

            <Map
              center={[-27.2092052, -49.6401092]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {position.latitude !== 0 && (
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[position.latitude,
                  position.longitude]} />
              )

              }

              {/* <Marker interactive={false} icon={mapIcon} position={[-27.2092052, -49.6401092]} /> */}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome da ideia</label>
              <input
                id="name"
                value={name}
                onChange={event => setName(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea
                id="sobre"
                maxLength={300}
                value={about}
                onChange={event => setAbout(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="number">Número de Whatsapp</label>
              <input
                id="number"
                value={number}
                onChange={event => setNumber(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map(image => {
                  return (
                    <img key={image} src={image} alt={name} />

                  )
                })}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>


              </div>
              <input multiple onChange={handleSelectImages} type="file" id="image[]" />
            </div>
          </fieldset>

          <fieldset>
            <legend>Copyright</legend>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Sua ideia será compartilhada no site e poderá ser usada como um tipo provisório de patente.</label>
              <label htmlFor="open_on_weekends">Gostaria de receber mentoria?</label>
            </div>
          </fieldset>
          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}
