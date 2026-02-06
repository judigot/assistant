# Workflow: Sprint + Chat = PR

## Core Model

- Sprint = container for multiple feature chats (parallel tasks)
- Feature chat = auto PR (draft by default)
- Regular chat = no PR unless promoted

## Chat Types

### Feature Chat (Sprint)

- Auto-creates a draft PR on chat creation
- Status starts at `draft`
- When contracts pass and the task is complete, mark `ready`

### Regular Chat (Ad-hoc)

- Lightweight by default
- Use **Promote to PR** to create a draft PR

## Promotion Flow

- Open a regular chat
- Click **Promote to PR**
- The chat is now tracked as a PR (draft)
- Mark **Ready** once contracts pass

## PR Statuses

- `draft`: work in progress, no review
- `ready`: contracts passing and ready for review

## Best Practices (Team-Style)

- One task per chat
- Keep scope small and well-defined
- Run contracts before marking ready
- Use sprint view to track multiple parallel PRs

## UI Cues

- **PR Draft / PR Ready** badges in chat list and header
- **Promote to PR** button for regular chats
- **Mark Ready** button for draft PRs
