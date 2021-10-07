import { IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRouterLink, IonRow, IonSpinner, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';

interface characeter {
  id: BigInteger
  name: string
  image: string
  status: string
}

const Home: React.FC = () => {

  const [characters, setCharacters] = useState<characeter[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCharacters()
  }, [])

  const getCharacters = async() => {
    const {data} = await axios.get('https://rickandmortyapi.com/api/character')
    const {results} = data
    setCharacters(results)
    setLoading(false)
  }

  const MainView = () => (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-2">

        {characters.map((c, i) =>(
          <IonRouterLink href={`/character/${c.id}`} key={i} className="w-full h-full bg-gray-300 p-2 rounded-md">
            <div className="w-full h-40">
              <img src={c.image} alt={c.name} className="w-full h-full object-cover rounded-md shadow-md filter contrast-125 brightness-95" />
            </div>
            <div className="flex justify-center items-center mt-2">
              <p className="text-gray-600 font-bold text-center">{c.name}</p>
            </div>
          </IonRouterLink>
        ))}
        
      </div>
    </div>
  )

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Rick and Morty API</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {loading ? 
          <div className="flex justify-center items-center h-full">
            <IonSpinner name="bubbles" color={'white'} />
          </div>
          :
          <MainView />
        }
      </IonContent>
    </IonPage>
  );
};

export default Home;
