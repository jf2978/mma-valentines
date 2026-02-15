const SESSION_KEY = 'mj-auth'

export function isAuthenticated(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === '1'
}

export function initAuth(onSuccess: () => void): void {
  if (isAuthenticated()) {
    removeGate()
    onSuccess()
    return
  }

  const form = document.querySelector<HTMLFormElement>('#auth-form')
  const input = document.querySelector<HTMLInputElement>('#auth-input')
  const error = document.querySelector<HTMLElement>('#auth-error')

  form?.addEventListener('submit', (e) => {
    e.preventDefault()
    if (input?.value === import.meta.env.VITE_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1')
      removeGate()
      onSuccess()
    } else {
      error?.removeAttribute('hidden')
      input?.select()
    }
  })
}

function removeGate(): void {
  const gate = document.querySelector('#auth-gate')
  gate?.remove()
}
