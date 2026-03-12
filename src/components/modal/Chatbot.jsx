import { useState, useRef, useEffect } from "react";
import api from "../../services/api";
import styles from "./chatbot.module.css";

import messageIcon from "../../assets/icons/message.svg";
import sendIcon from "../../assets/icons/paper-plane.svg";
import chefIcon from "../../assets/icons/chef-hat.svg";

const Chatbot = ({ openChat, setOpenChat, onOpen }) => {

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Halo! 👋 Saya Kala Assistant, siap membantu Anda menemukan resep yang sempurna. Ada bahan atau makanan yang ingin Anda masak hari ini?",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  ]);

  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState("session_" + Date.now());

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {

    const text = input.trim();
    if (!text) return;

    const userMsg = {
      sender: "user",
      text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");

    try {

      const response = await api.post("/chatbot/message", {
        message: text,
        session_id: sessionId
      });

      const data = response.data;

      console.log("CHATBOT RESPONSE:", data);

      if (!data.success) {
        throw new Error("Chatbot error");
      }

      // update session jika backend mengirim session baru
      if (data.session_id) {
        setSessionId(data.session_id);
      }

      const botMsg = {
        sender: "bot",
        text: data.bot_message || "Maaf saya tidak mengerti.",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        })
      };

      setMessages(prev => [...prev, botMsg]);

      // jika ada hasil resep
      if (data.recipes && data.recipes.length > 0) {

        const recipeText = data.recipes
          .map((r, i) => `${i + 1}. 🍲 ${r.nama}`)
          .join("\n");

        const recipeMsg = {
          sender: "bot",
          text: recipeText,
          time: botMsg.time
        };

        setMessages(prev => [...prev, recipeMsg]);
      }

    } catch (err) {

      console.error("CHATBOT ERROR:", err);

      let errorMessage = "Server chatbot tidak bisa dihubungi.";

      if (err.response?.status === 401) {
        errorMessage = "Silakan login terlebih dahulu.";
      }

      if (err.response?.status === 422) {
        errorMessage = "Pesan tidak valid.";
        console.log("VALIDATION ERROR:", err.response.data);
      }

      const botMsg = {
        sender: "bot",
        text: errorMessage,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        })
      };

      setMessages(prev => [...prev, botMsg]);

    }

  };

  return (
    <div className={styles.chatbotContainer}>

      {!openChat && (
        <button
          className={styles.chatbotButton}
          onClick={onOpen}
        >
          <img src={messageIcon} alt="chat"/>
        </button>
      )}

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
              onChange={(e)=>setInput(e.target.value)}
              onKeyDown={(e)=>{
                if(e.key==="Enter"){
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