import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonSpinner, IonTitle, IonToolbar } from "@ionic/react";
import axios from "axios";
import React, {useEffect, useState} from "react";
import { RouteComponentProps } from "react-router";
import { personSharp, maleFemaleSharp, medkitSharp, planetSharp, chevronBackSharp } from 'ionicons/icons'
import { Link } from "react-router-dom";

interface CharacterDetailPageProps
    extends RouteComponentProps<{
    id: string;
}> {}

interface Character {
    id: BigInteger
    name: string
    image: string
    status: string
    species: string
    gender: string
}

const Details: React.FC<CharacterDetailPageProps> = ({match, history}) => {

    const characterId = match.params.id
    const [character, setCharacter] = useState<Character>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getCharacter()
    }, [])

    const getCharacter = async() => {
        const {data} = await axios.get(`https://rickandmortyapi.com/api/character/${characterId}`)
        setCharacter(data)
        setLoading(false)
    }

    const MainView = () => (
        <div className="w-full h-full relative">
            <img src={character?.image} alt={character?.name} className="w-full h-full object-cover filter contrast-150 brightness-95" />
            <div className="absolute top-0 p-4" onClick={() => {
                history.goBack()
            }}>
                <div className="bg-gray-900 relative w-8 h-8 opacity-50 rounded-full shadow-xl"></div>
                <div className="absolute inset-0 flex justify-center items-center">
                    <IonIcon icon={chevronBackSharp} className="text-white" />
                </div>
            </div>
            <div className="absolute bottom-0 bg-gradient-to-t from-gray-900 w-full p-4">
                <div className="flex items-center space-x-4">
                    <IonIcon icon={personSharp} className="text-white" />
                    <p className="font-bold text-xl text-white">{character?.name}</p>
                </div>
                <div className="my-2 bg-gray-900 w-full p-2 rounded-md flex space-x-2 justify-center items-center">
                    <IonIcon icon={planetSharp} className="text-white" />
                    <p className="font-bold text-white">{character?.species}</p>
                </div>
                <div className="flex space-x-2 mb-2">
                    <div className="bg-gray-900 p-4 w-full rounded-md flex space-x-2 items-center justify-center">
                        <IonIcon icon={maleFemaleSharp} className="text-white" />
                        <p className="text-white">{character?.gender}</p>
                    </div>
                    <div className="bg-gray-900 p-4 w-full rounded-md flex space-x-2 items-center justify-center">
                        <IonIcon icon={medkitSharp} className="text-white" />
                        <p className="text-white">{character?.status}</p>
                    </div>
                </div>
            </div>
        </div>
    )

    return(
        <IonPage>
            <IonContent>
                {loading ? 
                    <div className="flex justify-center items-center h-full">
                        <IonSpinner name="bubbles" color={'white'} />
                    </div>
                    :
                    <MainView/>
                }
            </IonContent>
        </IonPage>
    )
}

export default Details