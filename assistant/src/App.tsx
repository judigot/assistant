import { useState, useRef, useEffect } from 'react'
import './App.css'

interface IMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

function App() {
  const [messages, setMessages] = useState<IMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your Dev Assistant. I can help you with code changes, debugging, and navigating your application. What would you like to do?',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: IMessage = {
      id: String(Date.now()),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')

    /* Simulate assistant response (will be replaced with actual AI backend) */
    setTimeout(() => {
      const assistantMessage: IMessage = {
        id: String(Date.now() + 1),
        role: 'assistant',
        content: `I received your message: "${input}". This is a placeholder response. The AI backend integration is coming soon!`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
    }, 500)
  }

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.role}`}>
            <div className="message-content">{message.content}</div>
            <div className="message-time">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form className="input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => { setInput(e.target.value) }}
          placeholder="Type a message..."
          autoFocus
        />
        <button type="submit" disabled={!input.trim()}>
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </form>
    </div>
  )
}

export default App
