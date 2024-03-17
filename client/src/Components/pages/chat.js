import { useState } from "react";
import "./chat.css";

function Chat() {
    const [Prompt, setPrompt] = useState("");
    const [ans, setAnswer] = useState("");
    const getChat = async () => {
        try {
       
            const postResponse = await fetch('http://localhost:3001/chat', {
                method: 'POST',
                body: JSON.stringify({
                    message: Prompt 
                }),
                headers: {
                    "Content-type": "application/json"
                }
            });
    
            if (!postResponse.ok) {
                throw new Error('Error sending prompt.');
            }

    
            const data = await postResponse.json();
            console.log(data);
            setAnswer(data.answer);


        } catch (error) {
            console.error('Error fetching chat:', error);
        }
    }
    

    return (
        <div className="container">
        <h1>Your personal financial assistant</h1>
    <input
        type="text"
        className="input-field"
        placeholder="Enter Prompt"
        onChange={(e) => {
            setPrompt(e.target.value);
        }}
    />
    <br />
    <br />
    <br />
    {/* <p>Wait for 5 seconds before.We are working!!!</p> */}
    <br />
    <br />
    <button onClick={getChat} className="button">Click to get answer</button>
    <br />
    <br />
    <br />
    <h3 className="answer-box">{ans}</h3>
</div>
        
    )
}

export default Chat;
