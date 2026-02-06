import type { IRepository } from '@/types.ts';

export const mockRepositories: IRepository[] = [
  {
    id: 'repo-1',
    name: 'dev-bubble',
    path: '~/projects/dev-bubble',
    sprints: [
      {
        id: 'sprint-1-1',
        name: 'Sprint 01: Core Dev Bubble',
        status: 'active',
        createdAt: new Date('2026-01-23T09:00:00'),
        updatedAt: new Date('2026-01-27T14:30:00'),
        chats: [
          {
            id: 'chat-1-1',
            title: 'Draggable bubble shell',
            description: 'Messenger-style floating entry point',
            createdAt: new Date('2026-01-24T10:00:00'),
            updatedAt: new Date('2026-01-27T12:15:00'),
            prStatus: 'draft',
            messages: [
              {
                id: 'msg-1',
                role: 'user',
                content: 'Make the assistant bubble draggable like Messenger',
                timestamp: new Date('2026-01-24T10:00:00'),
              },
              {
                id: 'msg-2',
                role: 'assistant',
                content: 'Added drag-to-move with edge boundaries and snap-friendly motion. Tap opens fullscreen assistant.',
                timestamp: new Date('2026-01-24T10:01:00'),
              },
            ],
          },
          {
            id: 'chat-1-2',
            title: 'Maximized assistant view',
            description: 'Fullscreen panel with header and close',
            createdAt: new Date('2026-01-24T11:00:00'),
            updatedAt: new Date('2026-01-24T11:20:00'),
            prStatus: 'draft',
            messages: [
              {
                id: 'msg-3',
                role: 'user',
                content: 'When tapped, the assistant should open fullscreen',
                timestamp: new Date('2026-01-24T11:00:00'),
              },
              {
                id: 'msg-4',
                role: 'assistant',
                content: 'Implemented fullscreen overlay with header controls and iframe content area.',
                timestamp: new Date('2026-01-24T11:05:00'),
              },
            ],
          },
          {
            id: 'chat-1-3',
            title: 'Runtime snapshot panel',
            description: 'Expose route and UI state',
            createdAt: new Date('2026-01-25T09:30:00'),
            updatedAt: new Date('2026-01-25T10:00:00'),
            prStatus: 'draft',
            messages: [
              {
                id: 'msg-5',
                role: 'user',
                content: 'Add a runtime snapshot section for route and modal state',
                timestamp: new Date('2026-01-25T09:30:00'),
              },
              {
                id: 'msg-6',
                role: 'assistant',
                content: 'Added a collapsible panel with route, panel state, and error flags.',
                timestamp: new Date('2026-01-25T09:34:00'),
              },
            ],
          },
        ],
      },
      {
        id: 'sprint-1-2',
        name: 'Sprint 02: Contract System',
        status: 'planned',
        createdAt: new Date('2026-01-26T08:00:00'),
        updatedAt: new Date('2026-01-26T08:00:00'),
        chats: [
          {
            id: 'chat-1-4',
            title: 'Golden test runner',
            description: 'Hard contracts gate completion',
            createdAt: new Date('2026-01-26T08:10:00'),
            updatedAt: new Date('2026-01-26T08:10:00'),
            prStatus: 'draft',
            messages: [
              {
                id: 'msg-7',
                role: 'user',
                content: 'Create a runner for hard contracts',
                timestamp: new Date('2026-01-26T08:10:00'),
              },
            ],
          },
          {
            id: 'chat-1-5',
            title: 'Revert by changeset ID',
            description: 'Audit log and rollback flow',
            createdAt: new Date('2026-01-26T08:20:00'),
            updatedAt: new Date('2026-01-26T08:20:00'),
            prStatus: 'draft',
            messages: [
              {
                id: 'msg-8',
                role: 'user',
                content: 'Support reverting by changeset ID',
                timestamp: new Date('2026-01-26T08:20:00'),
              },
            ],
          },
        ],
      },
    ],
    chats: [
      {
        id: 'chat-1-r1',
        title: 'Quick fix: HMR glitch',
        description: 'Investigate Vite reload issue',
        createdAt: new Date('2026-01-27T09:10:00'),
        updatedAt: new Date('2026-01-27T09:15:00'),
        prStatus: null,
        messages: [
          {
            id: 'msg-19',
            role: 'user',
            content: 'HMR doesn’t refresh styles on Safari',
            timestamp: new Date('2026-01-27T09:10:00'),
          },
          {
            id: 'msg-20',
            role: 'assistant',
            content: 'Likely caching + CSS order. I’ll add cache-busting and confirm Vite HMR overlay settings.',
            timestamp: new Date('2026-01-27T09:12:00'),
          },
        ],
      },
    ],
  },
  {
    id: 'repo-2',
    name: 'api-server',
    path: '~/projects/api-server',
    sprints: [
      {
        id: 'sprint-2-1',
        name: 'Sprint 05: Reliability',
        status: 'active',
        createdAt: new Date('2026-01-22T10:00:00'),
        updatedAt: new Date('2026-01-25T16:00:00'),
        chats: [
          {
            id: 'chat-2-1',
            title: 'Rate limiting',
            description: '100 req/min per IP',
            createdAt: new Date('2026-01-24T14:00:00'),
            updatedAt: new Date('2026-01-24T16:00:00'),
            prStatus: 'draft',
            messages: [
              {
                id: 'msg-9',
                role: 'user',
                content: 'Add rate limiting to all endpoints',
                timestamp: new Date('2026-01-24T14:00:00'),
              },
              {
                id: 'msg-10',
                role: 'assistant',
                content: 'Applied a sliding window limiter with 429 responses and Retry-After headers.',
                timestamp: new Date('2026-01-24T14:04:00'),
              },
            ],
          },
          {
            id: 'chat-2-2',
            title: 'Retry policy',
            description: 'Backoff for upstream calls',
            createdAt: new Date('2026-01-25T11:00:00'),
            updatedAt: new Date('2026-01-25T11:30:00'),
            prStatus: 'draft',
            messages: [
              {
                id: 'msg-11',
                role: 'user',
                content: 'Add exponential backoff for upstream calls',
                timestamp: new Date('2026-01-25T11:00:00'),
              },
            ],
          },
        ],
      },
      {
        id: 'sprint-2-2',
        name: 'Sprint 06: Data Layer',
        status: 'planned',
        createdAt: new Date('2026-01-26T09:00:00'),
        updatedAt: new Date('2026-01-26T09:00:00'),
        chats: [
          {
            id: 'chat-2-3',
            title: 'User preferences table',
            description: 'Theme, language, notifications',
            createdAt: new Date('2026-01-25T12:00:00'),
            updatedAt: new Date('2026-01-25T12:00:00'),
            prStatus: 'draft',
            messages: [
              {
                id: 'msg-12',
                role: 'user',
                content: 'Create migration for user_preferences',
                timestamp: new Date('2026-01-25T12:00:00'),
              },
            ],
          },
          {
            id: 'chat-2-4',
            title: 'Audit events',
            description: 'Persist admin actions',
            createdAt: new Date('2026-01-25T12:30:00'),
            updatedAt: new Date('2026-01-25T12:30:00'),
            prStatus: 'draft',
            messages: [
              {
                id: 'msg-13',
                role: 'user',
                content: 'Add audit logging for admin actions',
                timestamp: new Date('2026-01-25T12:30:00'),
              },
            ],
          },
        ],
      },
    ],
    chats: [
      {
        id: 'chat-2-r1',
        title: 'Ad-hoc log cleanup',
        description: 'Trim noisy auth logs',
        createdAt: new Date('2026-01-23T12:00:00'),
        updatedAt: new Date('2026-01-23T12:10:00'),
        prStatus: null,
        messages: [
          {
            id: 'msg-21',
            role: 'user',
            content: 'Reduce verbose auth logs in production',
            timestamp: new Date('2026-01-23T12:00:00'),
          },
          {
            id: 'msg-22',
            role: 'assistant',
            content: 'I’ll move the auth logs to debug and keep only warnings/errors in prod.',
            timestamp: new Date('2026-01-23T12:05:00'),
          },
        ],
      },
      {
        id: 'chat-2-r2',
        title: 'Quick schema check',
        description: 'Validate request payload',
        createdAt: new Date('2026-01-24T08:00:00'),
        updatedAt: new Date('2026-01-24T08:03:00'),
        prStatus: null,
        messages: [
          {
            id: 'msg-23',
            role: 'user',
            content: 'Add zod validation for POST /sessions',
            timestamp: new Date('2026-01-24T08:00:00'),
          },
        ],
      },
    ],
  },
  {
    id: 'repo-3',
    name: 'mobile-app',
    path: '~/projects/mobile-app',
    sprints: [
      {
        id: 'sprint-3-1',
        name: 'Sprint 03: Mobile Core',
        status: 'active',
        createdAt: new Date('2026-01-20T09:00:00'),
        updatedAt: new Date('2026-01-27T10:00:00'),
        chats: [
          {
            id: 'chat-3-1',
            title: 'Push notifications',
            description: 'FCM setup and handlers',
            createdAt: new Date('2026-01-26T15:00:00'),
            updatedAt: new Date('2026-01-27T10:00:00'),
            prStatus: 'draft',
            messages: [
              {
                id: 'msg-14',
                role: 'user',
                content: 'Set up push notifications with Firebase',
                timestamp: new Date('2026-01-26T15:00:00'),
              },
              {
                id: 'msg-15',
                role: 'assistant',
                content: 'Configured FCM for iOS and Android with background handling.',
                timestamp: new Date('2026-01-26T15:06:00'),
              },
            ],
          },
          {
            id: 'chat-3-2',
            title: 'Offline cache',
            description: 'Persist last 20 screens',
            createdAt: new Date('2026-01-27T09:00:00'),
            updatedAt: new Date('2026-01-27T09:20:00'),
            prStatus: 'draft',
            messages: [
              {
                id: 'msg-16',
                role: 'user',
                content: 'Add offline cache for last 20 screens',
                timestamp: new Date('2026-01-27T09:00:00'),
              },
            ],
          },
        ],
      },
      {
        id: 'sprint-3-2',
        name: 'Sprint 04: UX Polish',
        status: 'planned',
        createdAt: new Date('2026-01-27T11:00:00'),
        updatedAt: new Date('2026-01-27T11:00:00'),
        chats: [
          {
            id: 'chat-3-3',
            title: 'Haptics and micro feedback',
            description: 'Tap and success haptics',
            createdAt: new Date('2026-01-27T11:05:00'),
            updatedAt: new Date('2026-01-27T11:05:00'),
            prStatus: 'draft',
            messages: [
              {
                id: 'msg-17',
                role: 'user',
                content: 'Add haptic feedback for key actions',
                timestamp: new Date('2026-01-27T11:05:00'),
              },
            ],
          },
          {
            id: 'chat-3-4',
            title: 'Skeleton loaders',
            description: 'Reduce perceived latency',
            createdAt: new Date('2026-01-27T11:10:00'),
            updatedAt: new Date('2026-01-27T11:10:00'),
            prStatus: 'draft',
            messages: [
              {
                id: 'msg-18',
                role: 'user',
                content: 'Add skeleton loaders for feed and profile',
                timestamp: new Date('2026-01-27T11:10:00'),
              },
            ],
          },
        ],
      },
    ],
    chats: [
      {
        id: 'chat-3-r1',
        title: 'Crash on startup',
        description: 'Fix null pointer in auth flow',
        createdAt: new Date('2026-01-27T07:00:00'),
        updatedAt: new Date('2026-01-27T07:10:00'),
        prStatus: null,
        messages: [
          {
            id: 'msg-24',
            role: 'user',
            content: 'App crashes on cold start after login',
            timestamp: new Date('2026-01-27T07:00:00'),
          },
          {
            id: 'msg-25',
            role: 'assistant',
            content: 'Investigating auth hydration; will add null guards and delay navigation until ready.',
            timestamp: new Date('2026-01-27T07:05:00'),
          },
        ],
      },
    ],
  },
];
