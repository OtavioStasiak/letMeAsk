import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import { useHistory } from 'react-router-dom';
import { Button } from '../components/button';
import { useAuth } from '../hooks/authHook';
import Lottie from 'react-lottie';
import animation from '../animations/home-animation.json';
import '../styles/auth.scss';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';


export function Home(){
    const history = useHistory();
    const {user, signInWithGoogle} = useAuth();
    const [roomCode, setRoomCode] = useState('');

    function handleCreateRoom(){
        if(!user) {
            signInWithGoogle();
        };

        history.push('/rooms/new');
    };

    async function handleJoinRoom(event: FormEvent) {

        event.preventDefault();

        if (roomCode.trim() === '' ) {
            return;
        };

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if(!roomRef.exists()){
            alert('Room does not exists.');
            return;
        };

        if (!roomRef.exists()){
            alert('Room does not exists.');
            return;
        };

        if (roomRef.val().endedAt){
            alert('Room already closed.');
            return;
        };

        history.push(`/rooms/${roomCode}`);
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

                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </button>

                    <div className="separator">
                        ou entre em uma sala
                    </div>
                    <form onSubmit={handleJoinRoom}>

                        <input
                        type="text"
                        placeholder='Digite o código da sala'
                        onChange={event => setRoomCode(event.target.value)}
                        />

                        <Button onClick={handleJoinRoom} type='submit'>
                        Entrar na sala
                        </Button>

                    </form>
                </div>
            </main>
        </div>
    )
}