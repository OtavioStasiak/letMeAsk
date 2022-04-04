import { useHistory, useParams } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/authHook';
import { useRoom } from '../hooks/useRoom';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';
import '../styles/room.scss';
import { database } from '../services/firebase';

type RoomParams = {
    id: string;
};


export function AdminRoom(){

    const {user} = useAuth();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const {title, questions} = useRoom(roomId);
    const history = useHistory();

    async function handleDeleteQuestion(questionId: string) {
      if (window.confirm('Tem certeza que você deseja excluir essa pergunta?')) {
        const questionRef = await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
      };
    };

    async function handleEndRoom(){
       await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        });

        history.push('/');
    };

    async function handleCheckQuestionAsAnswered(questionId: string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        });


    };

    async function handleHighlightQuestion(questionId: string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true,
        });
    };


    return(
    <div id="page-room">
        <header>
            <div className="content">
                <img src={logoImg} alt="letMeAsk" />
                <div>
                    <RoomCode code={params.id} />
                    <Button onClick={handleEndRoom} isOutlined>Encerrar sala</Button>
                </div>
            </div>
        </header>

        <main>
            <div className='room-title'>
                <h1>
                    Sala {title}
                </h1>
                {questions.length > 0 && 
                <span>
                  {questions.length} {questions.length === 1 ? 'Pergunta' : 'Perguntas'}
                </span>
                }
            </div>

            <div className='question-list'>
                {questions.map((item, index) =>   
                <Question isAnswered={item.isAnswered} isHighlighted={item.isHighlighted} content={item.content} key={index} author={item.author}>
                    {!item.isAnswered &&
                    <>
                        <button type='button' onClick={() => handleCheckQuestionAsAnswered(item.id)}>
                            <img src={checkImg} alt="Pergunta Respondida"/>
                        </button> 
                        <button type='button' onClick={() => handleHighlightQuestion(item.id)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">     
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 17.9999H18C19.657 17.9999 21 16.6569 21 14.9999V6.99988C21 5.34288 19.657 3.99988 18 3.99988H6C4.343 3.99988 3 5.34288 3 6.99988V14.9999C3 16.6569 4.343 17.9999 6 17.9999H7.5V20.9999L12 17.9999Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </>
                    }
                    <button type='button' onClick={() => handleDeleteQuestion(item.id)}>
                        <img src={deleteImg} alt="Remover Pergunta"/>
                    </button>
                </Question>)}
            </div>
        </main>
    </div>
    )
}