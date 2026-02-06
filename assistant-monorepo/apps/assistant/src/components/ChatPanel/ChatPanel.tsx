import { useState, useRef, useEffect } from 'react';
import type { IChat, IMessage } from '@/types.ts';
import styles from './ChatPanel.module.css';

interface IChatPanelProps {
  chat: IChat | null;
  repositoryName: string;
  sprintName: string;
  onSendMessage: (chatId: string, content: string) => void;
  onPromoteChat: (chatId: string) => void;
  onMarkReady: (chatId: string) => void;
}

export function ChatPanel({
  chat,
  repositoryName,
  sprintName,
  onSendMessage,
  onPromoteChat,
  onMarkReady,
}: IChatPanelProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat?.messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '' || chat === null) {
      return;
    }
    onSendMessage(chat.id, input);
    setInput('');
  };

  if (chat === null) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="64" height="64">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
            </svg>
          </div>
          <h3 className={styles.emptyTitle}>Main branch active</h3>
          <p className={styles.emptyText}>
            Select a chat to switch to a feature branch or start a new task.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <h2 className={styles.chatTitle}>{chat.title}</h2>
          <span className={styles.chatMeta}>
            {repositoryName} • {sprintName} • {chat.messages.length} messages
          </span>
        </div>
        <div className={styles.headerActions}>
          {chat.prStatus === null && (
            <button className={styles.promoteButton} onClick={() => { onPromoteChat(chat.id); }}>
              Promote to PR
            </button>
          )}
          {chat.prStatus !== null && (
            <span className={`${styles.prBadge} ${chat.prStatus === 'ready' ? styles.prReady : styles.prDraft}`}>
              {chat.prStatus === 'ready' ? 'PR Ready' : 'PR Draft'}
            </span>
          )}
          {chat.prStatus === 'draft' && (
            <button className={styles.readyButton} onClick={() => { onMarkReady(chat.id); }}>
              Mark Ready
            </button>
          )}
          <button className={styles.actionButton} title="View changes">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
          </button>
          <button className={styles.actionButton} title="Settings">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.messages}>
        {chat.messages.map((message: IMessage) => (
          <div key={message.id} className={`${styles.message} ${styles[message.role]}`}>
            <div className={styles.messageAvatar}>
              {message.role === 'user' ? (
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M21 10.12h-6.78l2.74-2.82c-2.73-2.7-7.15-2.8-9.88-.1-2.73 2.71-2.73 7.08 0 9.79s7.15 2.71 9.88 0C18.32 15.65 19 14.08 19 12.1h2c0 1.98-.88 4.55-2.64 6.29-3.51 3.48-9.21 3.48-12.72 0-3.5-3.47-3.53-9.11-.02-12.58s9.14-3.47 12.65 0L21 3v7.12z"/>
                </svg>
              )}
            </div>
            <div className={styles.messageBody}>
              <div className={styles.messageHeader}>
                <span className={styles.messageRole}>
                  {message.role === 'user' ? 'You' : 'Assistant'}
                </span>
                <span className={styles.messageTime}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div className={styles.messageContent}>{message.content}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form className={styles.inputForm} onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            value={input}
            onChange={(e) => { setInput(e.target.value); }}
            placeholder="Describe what you want to build or fix..."
            autoFocus
          />
          <button type="submit" disabled={input.trim() === ''}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </div>
        <div className={styles.inputHint}>
          Press Enter to send • AI will edit code and run contracts
        </div>
      </form>
    </div>
  );
}
