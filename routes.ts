import InvoicePage from './pages/InvoicePage/index.vue';
import InvoiceConverterPage from './pages/InvoiceConverterPage/index.vue';
import DashboardPage from './pages/DashboardPage/index.vue';
import VehiclesPage from './pages/VehiclesPage/index.vue';

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
  },
  {
    path: '/invoices/:id',
    component: InvoiceConverterPage,
    name: 'Invoicew'
  },
  {
    path: '/vehicles',
    component: VehiclesPage,
    name: 'Vehicles'
  }
];
