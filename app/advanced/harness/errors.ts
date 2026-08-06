import type {App} from 'vue'
import {log} from './log'

function describe(value: unknown): string {
  if (value instanceof Error) return `${value.name}: ${value.message}`
  if (typeof value === 'string') return value
  try {
    return JSON.stringify(value)
  } catch {
    return String(value)
  }
}

function joinArgs(args: unknown[]): string {
  return args.map(describe).join(' ')
}

/**
 * Routes Vue's warnings/errors and raw console.error/warn into the harness log
 * so they land in the same timeline as mutations. Originals are still called, so
 * devtools keeps its stack traces.
 */
export function installErrorCapture(app: App) {
  // Bound before patching, so the handlers below don't log themselves twice.
  const originalError = console.error.bind(console)
  const originalWarn = console.warn.bind(console)

  app.config.errorHandler = (error, _instance, info) => {
    log({kind: 'error', instance: null, text: describe(error), detail: `vue error while ${info}`})
    originalError(error)
  }

  app.config.warnHandler = (message, _instance, trace) => {
    log({kind: 'warn', instance: null, text: message, detail: 'vue warning'})
    originalWarn(`[Vue warn] ${message}${trace ? `\n${trace}` : ''}`)
  }

  console.error = (...args: unknown[]) => {
    log({kind: 'error', instance: null, text: joinArgs(args), detail: 'console.error'})
    originalError(...args)
  }

  console.warn = (...args: unknown[]) => {
    log({kind: 'warn', instance: null, text: joinArgs(args), detail: 'console.warn'})
    originalWarn(...args)
  }

  window.addEventListener('error', (event) => {
    log({kind: 'error', instance: null, text: describe(event.error ?? event.message), detail: 'uncaught window error'})
  })

  window.addEventListener('unhandledrejection', (event) => {
    log({kind: 'error', instance: null, text: describe(event.reason), detail: 'unhandled rejection'})
  })
}
