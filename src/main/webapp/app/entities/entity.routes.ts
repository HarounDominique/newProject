import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'authority',
    data: { pageTitle: 'newProjectApp.adminAuthority.home.title' },
    loadChildren: () => import('./admin/authority/authority.routes'),
  },
  {
    path: 'post',
    data: { pageTitle: 'newProjectApp.post.home.title' },
    loadChildren: () => import('./post/post.routes'),
  },
  {
    path: 'comment',
    data: { pageTitle: 'newProjectApp.comment.home.title' },
    loadChildren: () => import('./comment/comment.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
