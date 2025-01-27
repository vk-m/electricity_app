import { createRouter, createWebHistory } from 'vue-router';
import ApplicationView from '@/components/ApplicationView.vue';
import CustomersView from '@/components/CustomersView.vue';

const routes = [
    { path: '/', name: 'home', component: ApplicationView },
    { path: '/customers', name: 'customersView', component: CustomersView },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;