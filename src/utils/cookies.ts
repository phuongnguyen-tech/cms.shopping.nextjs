import Cookies from 'js-cookie'

const TOKEN_COOKIE_NAME = 'token'

export function saveTokenToCookie(token: string): void {
  Cookies.set(TOKEN_COOKIE_NAME, token, { expires: 60 / 1440 }) // Lưu token vào cookie với thời hạn 1 ngày (có thể thay đổi)
}

export function getTokenFromCookie(): string | null {
  return Cookies.get(TOKEN_COOKIE_NAME) || null
}

export function removeTokenFromCookie(): void {
  Cookies.remove(TOKEN_COOKIE_NAME)
}
