import { useState } from 'react';
import type { IChat, ISprint } from '@/types.ts';
import styles from './ChatList.module.css';

interface IChatListProps {
  sprints: ISprint[];
  regularChats: IChat[];
  activeSprintId: string | null;
  activeChatId: string | null;
  activeChatScope: 'sprint' | 'regular';
  onSelectSprint: (sprintId: string) => void;
  onSelectChat: (chatId: string) => void;
  onSelectRegularChat: (chatId: string) => void;
  onNewChat: () => void;
}

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) {
    return 'Just now';
  }
  if (diffMins < 60) {
    return `${String(diffMins)}m ago`;
  }
  if (diffHours < 24) {
    return `${String(diffHours)}h ago`;
  }
  if (diffDays < 7) {
    return `${String(diffDays)}d ago`;
  }
  return date.toLocaleDateString();
}

export function ChatList({
  sprints,
  regularChats,
  activeSprintId,
  activeChatId,
  activeChatScope,
  onSelectSprint,
  onSelectChat,
  onSelectRegularChat,
  onNewChat,
}: IChatListProps) {
  const activeSprint = sprints.find((sprint) => sprint.id === activeSprintId) ?? sprints[0];
  const [isRegularOpen, setIsRegularOpen] = useState(true);
  const [openSprints, setOpenSprints] = useState<Record<string, boolean>>(
    () => Object.fromEntries(sprints.map((sprint) => [sprint.id, true]))
  );

  const toggleRegular = () => {
    setIsRegularOpen((prev) => !prev);
  };

  const toggleSprint = (sprintId: string) => {
    setOpenSprints((prev) => ({
      ...prev,
      [sprintId]: !prev[sprintId],
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Chats</h2>
        <button className={styles.newButton} onClick={onNewChat} title="New chat">
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
        </button>
      </div>
      <div className={styles.tree}>
        <button className={styles.treeGroup} onClick={toggleRegular}>
          <span className={`${styles.chevron} ${isRegularOpen ? styles.chevronOpen : ''}`}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
            </svg>
          </span>
          <span className={styles.folder}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
            </svg>
          </span>
          <span className={styles.treeLabel}>Regular Chats</span>
          <span className={styles.treeCount}>{regularChats.length}</span>
        </button>
        {isRegularOpen && (
          <div className={styles.treeChildren}>
            {regularChats.map((chat) => {
              const lastMessage = chat.messages[chat.messages.length - 1];
              return (
                <button
                  key={chat.id}
                  className={`${styles.treeItem} ${chat.id === activeChatId && activeChatScope === 'regular' ? styles.active : ''}`}
                  onClick={() => { onSelectRegularChat(chat.id); }}
                >
                  <span className={styles.file}>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                      <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm1 7V3.5L18.5 9H15z"/>
                    </svg>
                  </span>
                  <span className={styles.treeTitle}>{chat.title}</span>
                  <span className={styles.treeTime}>{formatRelativeTime(chat.updatedAt)}</span>
                  {chat.prStatus !== null && (
                    <span className={`${styles.prBadge} ${chat.prStatus === 'ready' ? styles.prReady : styles.prDraft}`}>
                      {chat.prStatus === 'ready' ? 'PR Ready' : 'PR Draft'}
                    </span>
                  )}
                  {lastMessage !== undefined && (
                    <span className={styles.treePreview}>
                      {lastMessage.role === 'user' ? 'You: ' : 'AI: '}{lastMessage.content}
                    </span>
                  )}
                </button>
              );
            })}
            {regularChats.length === 0 && (
              <div className={styles.emptySmall}>
                <p>No regular chats</p>
              </div>
            )}
          </div>
        )}

        {sprints.map((sprint) => (
          <div key={sprint.id}>
            <button
              className={styles.treeGroup}
              onClick={() => {
                toggleSprint(sprint.id);
                onSelectSprint(sprint.id);
              }}
            >
              <span className={`${styles.chevron} ${openSprints[sprint.id] ? styles.chevronOpen : ''}`}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
                </svg>
              </span>
              <span className={styles.folder}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
                </svg>
              </span>
              <span className={styles.treeLabel}>{sprint.name}</span>
              <span
                className={`${styles.sprintStatus} ${styles[`status${sprint.status.charAt(0).toUpperCase()}${sprint.status.slice(1)}`]}`}
              >
                {sprint.status}
              </span>
              <span className={styles.treeCount}>{sprint.chats.length}</span>
            </button>
            {openSprints[sprint.id] && (
              <div className={styles.treeChildren}>
                {sprint.chats.map((chat) => {
                  const lastMessage = chat.messages[chat.messages.length - 1];
                  return (
                    <button
                      key={chat.id}
                      className={`${styles.treeItem} ${chat.id === activeChatId && activeChatScope === 'sprint' ? styles.active : ''}`}
                      onClick={() => { onSelectChat(chat.id); }}
                    >
                      <span className={styles.file}>
                        <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                          <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm1 7V3.5L18.5 9H15z"/>
                        </svg>
                      </span>
                      <span className={styles.treeTitle}>{chat.title}</span>
                      <span className={styles.treeTime}>{formatRelativeTime(chat.updatedAt)}</span>
                      {chat.prStatus !== null && (
                        <span className={`${styles.prBadge} ${chat.prStatus === 'ready' ? styles.prReady : styles.prDraft}`}>
                          {chat.prStatus === 'ready' ? 'PR Ready' : 'PR Draft'}
                        </span>
                      )}
                      {lastMessage !== undefined && (
                        <span className={styles.treePreview}>
                          {lastMessage.role === 'user' ? 'You: ' : 'AI: '}{lastMessage.content}
                        </span>
                      )}
                    </button>
                  );
                })}
                {sprint.chats.length === 0 && (
                  <div className={styles.emptySmall}>
                    <p>No features in this sprint</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
