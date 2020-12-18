const publicRoutes = ['login']

export default function ({ route, store, redirect }) {
  // If user isn't authenticated and not accessing a public route, redirect to login page
  if (!publicRoutes.includes(route.name) && !store.state.auth.isLoggedIn) {
    return redirect('/login')
  }
}
