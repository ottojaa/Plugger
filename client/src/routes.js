import AddPlugPage from './components/AddPlugPage.vue'
import GalleryPage from './components/GalleryPage.vue'
import LoginPage from './components/LoginPage.vue'
import RegisterPage from './components/RegisterPage.vue'
import UserPage from './components/UserPage.vue'
import MainPage from './components/MainPage.vue'
import PlugPage from './components/PlugPage.vue'
import MyPlugs from './components/MyPlugs.vue'
import SavedPlugsPage from './components/SavedPlugsPage.vue'

export default [
  { path: '/', name: 'main', component: MainPage, props: true },
  { path: '/main', component: GalleryPage },
  { path: '/login', name: 'login', component: LoginPage, props: true },
  { path: '/register', name: 'register', component: RegisterPage, props: true },
  { path: '/userpage', component: UserPage },
  { path: '/addPlug', name: 'addPlug', component: AddPlugPage, props: true },
  { path: '/plug', component: PlugPage },
  { path: '/myPlugs', component: MyPlugs },
  { path: '/saved', component: SavedPlugsPage }
]
