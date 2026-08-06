import {ref} from 'vue'

export type LogKind = 'mutation' | 'call' | 'lifecycle' | 'divider' | 'warn' | 'error' | 'attribution' | 'collision' | 'info'

export interface LogEntry {
  id: number
  time: string
  kind: LogKind
  instance: number | null
  text: string
  from?: string
  to?: string
  detail?: string
}

const MAX_ENTRIES = 500
const STORAGE_KEY = 'vue3-component-store:harness-log'

function restore(): LogEntry[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as LogEntry[]).slice(-MAX_ENTRIES) : []
  } catch {
    return []
  }
}

export const entries = ref<LogEntry[]>(restore())
export const restoredFromReload = entries.value.length > 0

let nextId = entries.value.reduce((max, entry) => Math.max(max, entry.id), 0) + 1

let persistQueued = false
function persist() {
  if (persistQueued) return
  persistQueued = true
  queueMicrotask(() => {
    persistQueued = false
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(entries.value))
    } catch {
      // sessionStorage full or unavailable — the in-memory log still works.
    }
  })
}

function timestamp(): string {
  const d = new Date()
  const pad = (n: number, width = 2) => String(n).padStart(width, '0')
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}.${pad(d.getMilliseconds(), 3)}`
}

export function log(entry: Omit<LogEntry, 'id' | 'time'>) {
  entries.value.push({...entry, id: nextId++, time: timestamp()})
  const overflow = entries.value.length - MAX_ENTRIES
  if (overflow > 0) entries.value.splice(0, overflow)
  persist()
}

export function divider(text: string, instance: number | null = null) {
  log({kind: 'divider', text, instance})
}

export function clearLog() {
  entries.value = []
  try {
    sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}
