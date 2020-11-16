import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import '../styles/pages/ideas-map.css';
import mapIcon from '../utils/mapIcon';
import api from '../services/api'
import Idea from './Idea';
import Sidebar from "../components/Sidebar";

interface Idea {
    id: number
    latitude: number
    longitude: number
    name: string
}

function IdeasMap() {

    const [Ideas, setIdeas] = useState<Idea[]>([])

    console.log(Ideas)

    useEffect(() => {
        api.get('Ideas').then(response => {
            setIdeas(response.data)
        })
    }, [])

    return (
        <div id="page-map">
            <Sidebar />

            <Map
                center={[-29.9733013, -50.1318026]}
                zoom={15}
                style={{ width: '100%', height: '100%' }}>

                {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />



                {Ideas.map(Idea => {
                    return (

                        <Marker
                            key={Idea.id}
                            icon={mapIcon}
                            position={[Idea.latitude, Idea.longitude]}
                        >

                            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                {Idea.name}
                                <Link to={`/Ideas/${Idea.id}`}>
                                    <FiArrowRight size={20} color="#FFF" />
                                </Link>
                            </Popup>

                        </Marker>
                    )
                })}
            </Map>

            <Link to="/Ideas/create" className="create-Idea">
                <FiPlus size={32} color="#FFF" />
            </Link>
        </div>
    )
}

export default IdeasMap;