import { defaultIntegrationStates } from '@/data/integrations'
import type { IntegrationId, IntegrationStateMap } from '@/types/integrations'

const STORAGE_KEY = 'qa-intelligence-integrations-v1'

export function loadIntegrationStates(): IntegrationStateMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return structuredClone(defaultIntegrationStates)
    const parsed = JSON.parse(raw) as IntegrationStateMap
    return { ...structuredClone(defaultIntegrationStates), ...parsed }
  } catch {
    return structuredClone(defaultIntegrationStates)
  }
}

export function saveIntegrationStates(states: IntegrationStateMap): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(states))
}

export function resetIntegrationStates(): IntegrationStateMap {
  localStorage.removeItem(STORAGE_KEY)
  return structuredClone(defaultIntegrationStates)
}

export function maskToken(token: string): string {
  if (token.length <= 8) return '••••••••'
  return `${token.slice(0, 4)}••••${token.slice(-4)}`
}

/** Simulated secure store — never persists raw secrets in localStorage. */
const tokenVault = new Map<IntegrationId, string>()

export function storeIntegrationToken(id: IntegrationId, token: string): void {
  tokenVault.set(id, token)
}

export function hasIntegrationToken(id: IntegrationId): boolean {
  return tokenVault.has(id)
}

export function clearIntegrationToken(id: IntegrationId): void {
  tokenVault.delete(id)
}
