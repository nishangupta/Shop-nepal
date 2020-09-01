import Dashborad from './views/Dashboard'
import Team from './views/Team'
import Projects from './views/Projects'

const routes = [
  {
    path: '/',
    component: Dashborad,
    name: 'dashboard',
  },
  {
    path: '/team',
    component: Team,
    name: 'team',
  },
  {
    path: '/projects',
    component: Projects,
    name: 'projects',
  },
]

export default routes
