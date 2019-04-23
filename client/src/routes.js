import AddPlugPage from './components/AddPlugPage.vue'
import GalleryPage from './components/GalleryPage.vue'
import LoginPage from './components/LoginPage.vue'
import RegisterPage from './components/RegisterPage.vue'
import UserPage from './components/UserPage.vue'
import MainPage from './components/MainPage.vue'
import PlugPage from './components/PlugPage.vue'

export default [
  { path: '/', component: MainPage },
  { path: '/main', component: GalleryPage },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/userpage', component: UserPage },
  { path: '/addPlug', component: AddPlugPage },
  { path: '/plug', component: PlugPage }
]
