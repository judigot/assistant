# Product Requirements Document (PRD)

Product Name (Working)
Dev Bubble with Live Edit  
(Concept: Runtime-First, Contract-Driven Coding Agent)

Version
v1.1 (Contract-First Revision)

---

## 1. Purpose & Vision

### Problem
AI coding tools today are:
- editor-centric rather than system-centric
- reliant on prompts and subjective judgment
- weak at closing the loop between code changes and live behavior

Developers lack a deterministic, runtime-aware AI system that can:
- observe the running application,
- modify code safely,
- verify correctness automatically,
- and iterate until objective criteria are satisfied.

### Vision
Create a **dev-only, runtime-first AI coding system** where:
- the running app is the primary source of truth,
- the AI edits code via a controlled backend,
- correctness is enforced by **explicit contracts (golden tests)**,
- and all changes are observable, reversible, and auditable.

The AI is not trusted to be correct — it is **forced to be correct**.

---

## 2. Target User

Primary:
- Solo developers
- Power users of AI-assisted development
- Builders using Vite + React
- Developers experimenting with mobile-first or remote workflows

Out of Scope:
- Non-technical end users
- Production runtime environments
- Collaborative multi-user IDEs (V1)

---

## 3. Core Product Principles (Non-Negotiable)

1. **Contract-First Engineering**
   - Code is “done” only when contracts pass.
   - Prompts guide behavior; contracts enforce correctness.

2. **Runtime-First Awareness**
   - The AI reasons about a running system, not just text files.

3. **Determinism Over Cleverness**
   - Explicit tools, explicit rules, explicit verification.

4. **Total Reversibility**
   - Every change is logged and revertible.

5. **Dev-Only Power**
   - The system must not function in production builds.

---

## 4. Scope

### In Scope (V1)
- Vite + React applications
- Dev mode only
- Local development environments
- Bun-based backend (AI companion)
- Single active project
- Headless AI agent (no full editor)

### Out of Scope (V1)
- Production usage
- Cloud-hosted multi-tenant service
- Full IDE replacement
- Arbitrary shell access
- Database administration beyond schema validation

---

## 5. High-Level Architecture

### A. Vite React App (Client)
Responsibilities:
- Render the Dev Bubble UI
- Expose a dev-only bridge
- Provide curated runtime snapshots
- Execute allowlisted UI commands
- Reflect changes via Vite HMR

### B. AI Assistant Backend (Dev Companion)
Responsibilities:
- Run locally (Bun)
- Own API keys (Claude Opus or equivalent)
- Search and read project files
- Apply code edits as changesets
- Run contracts and checks
- Iterate until contracts pass or blocked

### C. Contract System (NEW)
Responsibilities:
- Define authoritative correctness criteria
- Execute golden tests against the project
- Emit structured failure reports
- Gate task completion

### D. Vite Dev Server
Responsibilities:
- Watch filesystem
- Perform hot module reload (HMR)
- Surface runtime errors

---

## 6. Core Features

### 6.1 Dev Bubble (UI)
- Floating, movable overlay
- Always accessible in dev mode
- Collapsible and dismissible
- Clear “DEV MODE” indicator

### 6.2 Runtime Snapshot
Curated, non-sensitive state only:
- current route / page identifier
- selected entity IDs
- active panels / modals
- edit mode flags
- loading and error states

### 6.3 UI Control (Command Registry)
Allowlisted commands only:
- navigate
- open / close panel or modal
- toggle edit mode
- simulate predefined flows

No direct state mutation by AI.

---

### 6.4 File Search & Navigation
AI tool access:
- search_files (ripgrep-style)
- read_file (line-range based)
- list_dir (optional)

Rules:
- Search before assuming
- Read before editing
- Minimize file access

---

### 6.5 Live Edit (Code Editing)
- AI proposes changes
- Backend applies changesets to disk
- Vite triggers HMR automatically

Edit constraints:
- Allowlisted paths only (e.g., src/**)
- node_modules and build artifacts forbidden

---

### 6.6 Changesets & Revert
Every edit produces a changeset:
- unique ID
- timestamp
- files changed
- before/after hashes

Capabilities:
- revert last
- revert by ID

---

## 7. Contract System (Golden Tests)

### Purpose
Contracts are the **definition of correctness**.

The AI must iterate until:
- all hard contracts pass, or
- a blocking decision is required.

### Location
ai-assistant/contracts/

### Contract Categories

#### Hard Contracts (Must Pass)
- API invariants (status codes, response shapes)
- Schema and data integrity
- Required filesystem structure
- Auth and permission rules

#### Soft Contracts (Warnings)
- Style conventions
- Performance heuristics
- UX polish checks

Only hard contracts block completion.

---

## 8. AI Agent Responsibilities

The AI must follow a strict loop:

1. Restate goal (one sentence)
2. Gather evidence (search + read)
3. Propose a minimal plan
4. Apply edits as changesets
5. Run contracts and checks
6. Fix failures automatically
7. Report outcome and revert path

The AI must not guess or silently fail.

---

## 9. Tooling Interface (Abstract)

Required tools:
- search_files
- read_file
- apply_changeset
- revert_changeset
- run_contracts
- run_checks
- get_runtime_snapshot

All tools return structured, machine-readable output.

---

## 10. Dev Mode Gating

The system activates only when:
- import.meta.env.DEV === true
- or an explicit dev flag is present

Production builds must:
- remove Dev Bubble UI
- remove bridge code
- disable backend connections

---

## 11. Non-Functional Requirements

Performance:
- Snapshot generation < 10 ms
- Search responsiveness acceptable for Vite-scale repos

Reliability:
- No silent edits
- No irreversible actions
- Clear error and failure reporting

Security (Dev Context):
- Path traversal protection
- Project root isolation
- No secrets in frontend

---

## 12. Success Criteria

Qualitative:
- Developer can debug and fix UI issues without touching a keyboard
- Runtime behavior changes are immediately visible
- AI fixes its own mistakes via contracts

Quantitative:
- Reduced edit-reload cycles
- Fewer manual reverts
- High contract pass rate on first iteration

---

## 13. V1 Milestones

1. Dev Bubble UI
2. Runtime snapshot bridge
3. File search + read tools
4. Bun backend with filesystem edits
5. Changeset + revert system
6. Contract runner (hard contracts only)
7. Claude Opus integration
8. Mobile access via LAN or tunnel

---

## 14. Final Principle

The AI is powerful, but never authoritative.

Authority belongs to:
- explicit contracts,
- deterministic tools,
- and observable system behavior.

This is not prompt-driven coding.
This is **contract-driven, runtime-first engineering**.

