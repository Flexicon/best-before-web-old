const publicRoutes = ['login']

export default function ({ route, store, redirect }) {
  if (!publicRoutes.includes(route.name) && !store.state.auth.isLoggedIn) {
    return redirect('/login')
  }
}
