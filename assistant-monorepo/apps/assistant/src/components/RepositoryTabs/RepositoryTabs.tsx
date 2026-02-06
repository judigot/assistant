import { useState } from 'react';
import type { IRepository } from '@/types.ts';
import styles from './RepositoryTabs.module.css';

interface IRepositoryTabsProps {
  repositories: IRepository[];
  activeRepoId: string;
  onSelectRepo: (repoId: string) => void;
  onSelectBranch: (repoId: string, chatId: string, scope: 'sprint' | 'regular', sprintId?: string) => void;
}

export function RepositoryTabs({
  repositories,
  activeRepoId,
  onSelectRepo,
  onSelectBranch,
}: IRepositoryTabsProps) {
  const [openRepoId, setOpenRepoId] = useState<string | null>(null);

  const toggleMenu = (repoId: string) => {
    setOpenRepoId((prev) => (prev === repoId ? null : repoId));
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        {repositories.map((repo) => (
          <div key={repo.id} className={styles.tabGroup}>
            <div
              className={`${styles.tabShell} ${repo.id === activeRepoId ? styles.active : ''}`}
              onClick={() => { onSelectRepo(repo.id); }}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  onSelectRepo(repo.id);
                }
              }}
            >
              <span className={styles.tabContent}>
                <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
                <span className={styles.name}>{repo.name}</span>
                <span className={styles.count}>
                  {repo.sprints.reduce((total, sprint) => total + sprint.chats.length, 0) + repo.chats.length}
                </span>
              </span>
              <button
                className={`${styles.chevronButton} ${openRepoId === repo.id ? styles.chevronOpen : ''}`}
                onClick={(event) => {
                  event.stopPropagation();
                  toggleMenu(repo.id);
                }}
                aria-label={`Open branches for ${repo.name}`}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M7 10l5 5 5-5z"/>
                </svg>
              </button>
            </div>
            {openRepoId === repo.id && (
              <div className={styles.menu}>
                <div className={styles.menuSection}>
                  <span className={styles.menuLabel}>Regular Chats</span>
                  {repo.chats.length === 0 && (
                    <span className={styles.menuEmpty}>No regular chats</span>
                  )}
                  {repo.chats.map((chat) => (
                    <button
                      key={chat.id}
                      className={styles.menuItem}
                      onClick={() => {
                        onSelectBranch(repo.id, chat.id, 'regular');
                        setOpenRepoId(null);
                      }}
                    >
                      <span className={styles.menuItemText}>{chat.title}</span>
                      {chat.prStatus !== null && (
                        <span className={`${styles.menuBadge} ${chat.prStatus === 'ready' ? styles.menuBadgeReady : styles.menuBadgeDraft}`}>
                          {chat.prStatus === 'ready' ? 'Ready' : 'Draft'}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                <div className={styles.menuSection}>
                  <span className={styles.menuLabel}>Sprint Chats</span>
                  {repo.sprints.map((sprint) => (
                    <div key={sprint.id} className={styles.menuGroup}>
                      <span className={styles.menuGroupLabel}>{sprint.name}</span>
                      {sprint.chats.map((chat) => (
                        <button
                          key={chat.id}
                          className={styles.menuItem}
                          onClick={() => {
                            onSelectBranch(repo.id, chat.id, 'sprint', sprint.id);
                            setOpenRepoId(null);
                          }}
                        >
                          <span className={styles.menuItemText}>{chat.title}</span>
                          {chat.prStatus !== null && (
                            <span className={`${styles.menuBadge} ${chat.prStatus === 'ready' ? styles.menuBadgeReady : styles.menuBadgeDraft}`}>
                              {chat.prStatus === 'ready' ? 'Ready' : 'Draft'}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <button className={styles.addButton} title="Add repository">
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
      </button>
    </div>
  );
}
