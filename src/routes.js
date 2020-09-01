import Dashborad from './views/Dashboard'
import Team from './views/Team'
import Projects from './views/Projects'

const routes = [
  {
    path: '/',
    component: Dashborad,
  },
  {
    path: '/team',
    component: Team,
  },
  {
    path: '/projects',
    component: Projects,
  },
]

export default routes
