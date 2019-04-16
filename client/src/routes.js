import MainPage from './components/MainPage.vue'
import GalleryPage from './components/GalleryPage.vue'
import LoginPage from './components/LoginPage.vue'
import RegisterPage from './components/RegisterPage.vue'
import UserPage from './components/UserPage.vue'

export default [
  { path: '/', component: GalleryPage },
  { path: '/addPlug', component: MainPage },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/userpage', component: UserPage }
]
