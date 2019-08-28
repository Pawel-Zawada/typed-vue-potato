import InvoicePage from './pages/InvoicePage/index.vue';
import InvoiceEditPage from './pages/InvoiceEditPage/index.vue';
import DashboardPage from './pages/DashboardPage/index.vue';

export default [
  {
    path: '/',
    component: DashboardPage,
    name: 'Dashboard'
  },
  {
    path: '/invoices',
    component: InvoicePage,
    name: 'Invoices'
  }
];
