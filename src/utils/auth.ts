// Vanilla JavaScript auth utilities
export const auth = {
  // Check if user is logged in
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token')
  },

  // Get current user
  getCurrentUser() {
    const userJson = localStorage.getItem('user')
    if (userJson) {
      try {
        return JSON.parse(userJson)
      } catch {
        return null
      }
    }
    return null
  },

  // Login user
  login(token: string, user: any) {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
  },

  // Logout user
  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('bookingDate')
    localStorage.removeItem('roomId')
    localStorage.removeItem('bookingId')
    localStorage.removeItem('guests')
  },
}
