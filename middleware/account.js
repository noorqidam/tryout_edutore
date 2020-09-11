export default function ({ store, redirect }) {
  // automatic redirect
  if (!store.state.profile) {
    return redirect('/valid')
  }
}
