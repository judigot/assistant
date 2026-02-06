import { useState } from 'react'
import styles from './DevBubble.module.css'

const ASSISTANT_URL = 'http://localhost:5174'

export function DevBubble() {
  const [isOpen, setIsOpen] = useState(false)

  if (!import.meta.env.DEV) {
    return null
  }

  return (
    <div className={styles.container}>
      {isOpen && (
        <div className={styles.panel}>
          <div className={styles.header}>
            <span className={styles.title}>Dev Assistant</span>
            <button
              className={styles.closeButton}
              onClick={() => { setIsOpen(false) }}
              aria-label="Close assistant"
            >
              ×
            </button>
          </div>
          <iframe
            src={ASSISTANT_URL}
            className={styles.iframe}
            title="Dev Assistant"
          />
        </div>
      )}
      <button
        className={`${styles.bubble} ${isOpen ? styles.bubbleOpen : ''}`}
        onClick={() => { setIsOpen(!isOpen) }}
        aria-label={isOpen ? 'Close assistant' : 'Open assistant'}
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
          </svg>
        )}
      </button>
      <span className={styles.devIndicator}>DEV</span>
    </div>
  )
}
