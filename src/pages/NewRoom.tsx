import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss';
import { Button } from '../components/button';
import { useAuth } from '../hooks/authHook';

export function NewRoom(){
    const {user} = useAuth();

    console.log(user);
    return(

        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />

                <strong>Crie salas de Q&amp;A ao-vivo</strong>

                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>

            <main>
                <div className='main-content'>
                    <img src={logoImg} alt="LetMeAsk" />
                    <h2>Criar uma nova sala</h2>
                    <form>

                        <input
                        type="text"
                        placeholder='Nome da sala'
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