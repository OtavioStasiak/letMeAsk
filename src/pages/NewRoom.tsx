import { FormEvent, useState } from 'react';

import logoImg from '../assets/images/logo.svg';
import Lottie from 'react-lottie';
import animation from '../animations/home-animation.json';
import '../styles/auth.scss';
import { Button } from '../components/button';
import { useAuth } from '../hooks/authHook';
import { database } from '../services/firebase';
import { useHistory } from 'react-router-dom';

export function NewRoom(){
    
    const {user} = useAuth();
    const history = useHistory();
    const [newRoom, setNewRoom] = useState('');

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        if(newRoom.trim() === ''){
            return;
        };

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user!.id
        });

        history.push(`/rooms/${firebaseRoom.key}`);
    };

    return(

        <div id="page-auth">

            <aside>
            <Lottie 
                options={{loop: true, autoplay:true, animationData: animation, rendererSettings: {
                    preserveAspectRatio: 'xMidYmid slice'
                }}}
                style={{paddingRight:20}}
                height={400}
                width={400}
                />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>

                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>

            <main>

                <div className='main-content'>
                    <img src={logoImg} alt="LetMeAsk" />
                    <h2>Criar uma nova sala</h2>

                    <form onSubmit={handleCreateRoom}>
                        <input
                        type="text"
                        placeholder='Nome da sala'
                        onChange={event => setNewRoom(event.target.value)}
                        />

                        <Button type='submit'>
                        Entrar na sala
                        </Button>
                        <p>
                          Quer entrar em uma sala existente? <a href='#'>clique aqui</a>
                        </p>
                    </form>
                </div>

            </main>
        </div>
    )
}