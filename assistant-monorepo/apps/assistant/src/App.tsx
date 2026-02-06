import { useState } from 'react';
import { RepositoryTabs } from '@/components/RepositoryTabs/RepositoryTabs.tsx';
import { ChatList } from '@/components/ChatList/ChatList.tsx';
import { ChatPanel } from '@/components/ChatPanel/ChatPanel.tsx';
import { mockRepositories } from '@/data/mockData.ts';
import type { IRepository, IMessage } from '@/types.ts';
import '@/styles/App.css';

function App() {
  const [repositories, setRepositories] = useState<IRepository[]>(mockRepositories);
  const [activeRepoId, setActiveRepoId] = useState<string>(mockRepositories[0]?.id ?? '');
  const [activeSprintId, setActiveSprintId] = useState<string | null>(mockRepositories[0]?.sprints[0]?.id ?? null);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [activeChatScope, setActiveChatScope] = useState<'sprint' | 'regular'>('regular');

  const activeRepo = repositories.find((r) => r.id === activeRepoId);
  const activeSprint = activeRepo?.sprints.find((s) => s.id === activeSprintId) ?? null;
  const activeChat = activeChatScope === 'regular'
    ? activeRepo?.chats.find((c) => c.id === activeChatId) ?? null
    : activeSprint?.chats.find((c) => c.id === activeChatId) ?? null;

  const handleSelectRepo = (repoId: string) => {
    setActiveRepoId(repoId);
    const repo = repositories.find((r) => r.id === repoId);
    const nextSprint = repo?.sprints[0] ?? null;
    setActiveSprintId(nextSprint?.id ?? null);
    setActiveChatScope('regular');
    setActiveChatId(null);
  };

  const handleSelectBranch = (
    repoId: string,
    chatId: string,
    scope: 'sprint' | 'regular',
    sprintId?: string
  ) => {
    setActiveRepoId(repoId);
    setActiveChatScope(scope);
    setActiveChatId(chatId);
    if (scope === 'sprint') {
      setActiveSprintId(sprintId ?? null);
      return;
    }
    const repo = repositories.find((r) => r.id === repoId);
    setActiveSprintId(repo?.sprints[0]?.id ?? null);
  };

  const handleSelectSprint = (sprintId: string) => {
    setActiveSprintId(sprintId);
    const sprint = activeRepo?.sprints.find((s) => s.id === sprintId) ?? null;
    setActiveChatScope('sprint');
    setActiveChatId(sprint?.chats[0]?.id ?? null);
  };

  const handleSelectChat = (chatId: string) => {
    if (activeChatScope === 'sprint' && activeChatId === chatId) {
      setActiveChatId(null);
      setActiveChatScope('regular');
      return;
    }
    setActiveChatScope('sprint');
    setActiveChatId(chatId);
  };

  const handleSelectRegularChat = (chatId: string) => {
    if (activeChatScope === 'regular' && activeChatId === chatId) {
      setActiveChatId(null);
      return;
    }
    setActiveChatScope('regular');
    setActiveChatId(chatId);
  };

  const handleNewChat = () => {
    if (activeRepo === undefined) {
      return;
    }

    const newChat = {
      id: `chat-${String(Date.now())}`,
      title: 'New feature',
      description: 'Describe your task...',
      prStatus: activeChatScope === 'regular' ? null : 'draft',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (activeChatScope === 'regular' || activeSprintId === null) {
      setRepositories((prev) =>
        prev.map((repo) =>
          repo.id === activeRepoId
            ? { ...repo, chats: [newChat, ...repo.chats] }
            : repo
        )
      );
      setActiveChatScope('regular');
      setActiveChatId(newChat.id);
      return;
    }

    setRepositories((prev) =>
      prev.map((repo) =>
        repo.id === activeRepoId
          ? {
              ...repo,
              sprints: repo.sprints.map((sprint) =>
                sprint.id === activeSprintId
                  ? { ...sprint, chats: [newChat, ...sprint.chats], updatedAt: new Date() }
                  : sprint
              ),
            }
          : repo
      )
    );
    setActiveChatId(newChat.id);
  };

  const handleSendMessage = (chatId: string, content: string) => {
    const userMessage: IMessage = {
      id: `msg-${String(Date.now())}`,
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setRepositories((prev) =>
      prev.map((repo) =>
        repo.id === activeRepoId
          ? {
              ...repo,
              sprints: repo.sprints.map((sprint) =>
                sprint.id === activeSprintId
                  ? {
                      ...sprint,
                      updatedAt: new Date(),
                      chats: sprint.chats.map((chat) =>
                        chat.id === chatId && activeChatScope === 'sprint'
                          ? {
                              ...chat,
                              messages: [...chat.messages, userMessage],
                              updatedAt: new Date(),
                            }
                          : chat
                      ),
                    }
                  : sprint
              ),
              chats: repo.chats.map((chat) =>
                chat.id === chatId && activeChatScope === 'regular'
                  ? { ...chat, messages: [...chat.messages, userMessage], updatedAt: new Date() }
                  : chat
              ),
            }
          : repo
      )
    );

    /* Simulate assistant response */
    setTimeout(() => {
      const assistantMessage: IMessage = {
        id: `msg-${String(Date.now() + 1)}`,
        role: 'assistant',
        content: `I received: "${content}". The AI backend will process this and apply code changes. This is a static demo.`,
        timestamp: new Date(),
      };

      setRepositories((prev) =>
        prev.map((repo) =>
          repo.id === activeRepoId
            ? {
                ...repo,
                sprints: repo.sprints.map((sprint) =>
                  sprint.id === activeSprintId
                    ? {
                        ...sprint,
                        updatedAt: new Date(),
                        chats: sprint.chats.map((chat) =>
                          chat.id === chatId && activeChatScope === 'sprint'
                            ? {
                                ...chat,
                                messages: [...chat.messages, assistantMessage],
                                updatedAt: new Date(),
                              }
                            : chat
                        ),
                      }
                    : sprint
                ),
                chats: repo.chats.map((chat) =>
                  chat.id === chatId && activeChatScope === 'regular'
                    ? { ...chat, messages: [...chat.messages, assistantMessage], updatedAt: new Date() }
                    : chat
                ),
              }
            : repo
        )
      );
    }, 600);
  };

  const handlePromoteChat = (chatId: string) => {
    setRepositories((prev) =>
      prev.map((repo) =>
        repo.id === activeRepoId
          ? {
              ...repo,
              chats: repo.chats.map((chat) =>
                chat.id === chatId ? { ...chat, prStatus: 'draft', updatedAt: new Date() } : chat
              ),
            }
          : repo
      )
    );
  };

  const handleMarkReady = (chatId: string) => {
    setRepositories((prev) =>
      prev.map((repo) =>
        repo.id === activeRepoId
          ? {
              ...repo,
              sprints: repo.sprints.map((sprint) =>
                sprint.id === activeSprintId
                  ? {
                      ...sprint,
                      updatedAt: new Date(),
                      chats: sprint.chats.map((chat) =>
                        chat.id === chatId ? { ...chat, prStatus: 'ready', updatedAt: new Date() } : chat
                      ),
                    }
                  : sprint
              ),
              chats: repo.chats.map((chat) =>
                chat.id === chatId ? { ...chat, prStatus: 'ready', updatedAt: new Date() } : chat
              ),
            }
          : repo
      )
    );
  };

  return (
    <div className="app-container">
      <RepositoryTabs
        repositories={repositories}
        activeRepoId={activeRepoId}
        onSelectRepo={handleSelectRepo}
        onSelectBranch={handleSelectBranch}
      />
      <div className="app-main">
        <ChatList
          sprints={activeRepo?.sprints ?? []}
          regularChats={activeRepo?.chats ?? []}
          activeSprintId={activeSprintId}
          activeChatId={activeChatId}
          activeChatScope={activeChatScope}
          onSelectSprint={handleSelectSprint}
          onSelectChat={handleSelectChat}
          onSelectRegularChat={handleSelectRegularChat}
          onNewChat={handleNewChat}
        />
        <ChatPanel
          chat={activeChat}
          repositoryName={activeRepo?.name ?? ''}
          sprintName={activeChatScope === 'regular' ? 'main' : activeSprint?.name ?? 'main'}
          onSendMessage={handleSendMessage}
          onPromoteChat={handlePromoteChat}
          onMarkReady={handleMarkReady}
        />
      </div>
    </div>
  );
}

export default App;
