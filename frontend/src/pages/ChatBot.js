import React, { useState, useEffect } from "react";

export default function ChatBot() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chatMessages");
    return saved ? JSON.parse(saved) : [{ role: "assistant", content: "무엇을 도와 드릴까요?" }];
  });
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await fetch("http://localhost:8000/api/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      if (data?.content) {
        setMessages([...newMessages, data]);
      }
    } catch (err) {
      console.error("❌ 오류:", err);
    }
  };

  const clearMessages = () => {
    localStorage.removeItem("chatMessages");
    setMessages([{ role: "assistant", content: `안녕하세요. 현대자동차 고객센터 챗봇입니다. 궁금한 내용을 질문해 보세요.`, }]);
  };

  return (
    <>
      {/* 고정형 챗봇 토글 버튼 */}
      <div
        style={{
          position: "fixed",
          bottom: "70px",
          right: "40px",
          zIndex: 999,

        }}
      >
        {!isOpen ? (
          <button className="btn"
            onClick={() => setIsOpen(true)}
          >
            <img src="/img/chatbot.svg"></img>
          </button>
        ) : (
          <div
            style={{
              width: 300,
              height: 500,
              backgroundColor: '#f6f3f2',
              borderRadius: 10,
              boxShadow: "0 0 10px rgba(0,0,0,0.2)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* 헤더 */}
            <div style={{ padding: 10, display: "flex", marginBottom: 10 }}>
              <span style={{ marginRight: 10 }}><img style={{ width: 30, height: 30 }} src="/img/chatbot.svg"></img></span>
              <strong style={{ paddingTop: 3 }}>챗봇 대화중</strong>
              <button style={{ marginLeft: 'auto', paddingTop: 0 }} className="btn btn-sm " onClick={() => setIsOpen(false)}>
                <img style={{ width: 20, height: 20 }} src="/img/close.svg"></img>
              </button>
            </div>

            {/* 메시지 목록 */}
            <div style={{ flex: 1, padding: 10, overflowY: "auto" }}>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={msg.role === "user" ? "text-end" : "text-start mt-2"}
                  style={{ lineHeight: "1.3" }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      maxWidth: "80%",
                      wordBreak: "break-word",
                      backgroundColor: msg.role === "user" ? "rgb(0, 127, 168)" : "#fff",
                      color: msg.role === "user" ? "#fff" : "#000",
                      padding: "8px 12px",
                      fontSize:13,
                      borderRadius: msg.role === "user" ? "12px 0px 12px 12px" : "0px 12px 12px",
                      marginBottom: 20
                    }}
                  >
                    {msg.content}
                  </span>
                </div>
              ))}
            </div>

            {/* 입력창 */}
            <div style={{ padding: 10, backgroundColor: "#f6f3f2" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>

                {/* 🗑 초기화 버튼 */}
                <button
                  onClick={clearMessages}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                    border: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    cursor: "pointer"
                  }}
                >
                  🗑
                </button>

                {/* 입력창 + 전송버튼 영역 */}
                <div style={{ display: "flex", flexGrow: 1, alignItems: "center", backgroundColor: "#fff", borderRadius: 24, padding: "0px 6px" }}>
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="궁금한 점을 입력해 주세요."
                    className="form-control"
                    style={{ border: "none", outline: "none", flexGrow: 1, fontSize: 14 }}
                  />
                  <button
                    onClick={sendMessage}
                    style={{
                      border: "none",
                      background: "transparent",
                      padding: 0,
                      width: 40,
                      height: 40,
                      cursor: "pointer"
                    }}
                  >
                    <img src="/img/chat-btn.svg" alt="전송" style={{ width: "100%", height: "100%" }} />
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </>
  );
}
