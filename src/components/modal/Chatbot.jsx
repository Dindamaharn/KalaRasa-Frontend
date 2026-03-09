import { useState, useRef, useEffect } from "react";
import styles from "./chatbot.module.css";
import messageIcon from "../../assets/icons/message.svg";
import sendIcon from "../../assets/icons/paper-plane.svg";
import chefIcon from "../../assets/icons/chef-hat.svg";

const Chatbot = () => {

    const [openChat, setOpenChat] = useState(false);

    const [messages, setMessages] = useState([
        {
        sender: "bot",
        text: "Halo! 👋 Saya Kala Assistant, siap membantu Anda menemukan resep yang sempurna. Ada bahan atau makanan yang ingin Anda masak hari ini?",
        time: "22.00"
        },
        {
        sender: "user",
        text: "Saya memiliki daun pakis bisa diolah menjadi apa ya?",
        time: "22.02"
        }
    ]);

    const [input, setInput] = useState("");

    const chatEndRef = useRef(null);

    // auto scroll
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = () => {

        if(input.trim() === "") return;

        const newMessage = {
        sender: "user",
        text: input,
        time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        })
        };

        setMessages([...messages, newMessage]);
        setInput("");

    };

    return (
        <div className={styles.chatbotContainer}>

        {/* BUTTON */}
        {!openChat && (
            <button
            className={styles.chatbotButton}
            onClick={() => setOpenChat(true)}
            >
            <img src={messageIcon} alt="chat"/>
            </button>
        )}

        {/* POPUP */}
        {openChat && (
            <div className={styles.chatbotPopup}>

            {/* HEADER */}
            <div className={styles.chatHeader}>
                <div className={styles.headerLeft}>
                <div className={styles.botIcon}>
                    <img src={chefIcon} alt="bot"/>
                </div>

                <div>
                    <h4>Kala Assistant</h4>
                    <span className={styles.online}>● Online</span>
                </div>
                </div>

                <button
                className={styles.closeBtn}
                onClick={() => setOpenChat(false)}
                >
                ✕
                </button>
            </div>

            {/* BODY */}
            <div className={styles.chatBody}>

                <div className={styles.date}>Hari Ini</div>

                {messages.map((msg, index) => (

                msg.sender === "bot" ? (

                    <div className={styles.botMessage} key={index}>

                    <div className={styles.botAvatar}>
                        <img src={chefIcon} alt="bot"/>
                    </div>

                    <div>
                        <div className={styles.messageBubbleBot}>
                        {msg.text}
                        </div>

                        <span className={styles.timestamp}>
                        {msg.time}
                        </span>
                    </div>

                    </div>

                ) : (

                    <div className={styles.userMessage} key={index}>

                    <div>
                        <div className={styles.messageBubbleUser}>
                        {msg.text}
                        </div>

                        <span className={styles.timestampUser}>
                        {msg.time}
                        </span>
                    </div>

                    </div>

                )

                ))}

                <div ref={chatEndRef}></div>

            </div>

            {/* INPUT */}
            <div className={styles.chatInput}>

                <input
                type="text"
                placeholder="Tuliskan pertanyaanmu disini..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e)=>{
                    if(e.key === "Enter"){
                    sendMessage();
                    }
                }}
                />

                <button onClick={sendMessage}>
                <img src={sendIcon} alt="send"/>
                </button>

            </div>

            </div>
        )}

        </div>
    );
};

export default Chatbot;