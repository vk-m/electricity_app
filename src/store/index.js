import { createStore } from 'vuex';

const store = createStore({
    state: {
        applications: [],
        customers: [],
    },
    mutations: {
        saveApplication(state, application) {
            const existingIndex = state.applications.findIndex((app) => app.id === application.id);
            if (existingIndex !== -1) {
                state.applications[existingIndex] = application;
            } else {
                state.applications.push(application);
            }
        },
        saveCustomer(state, customer) {
            const existingIndex = state.customers.findIndex((cust) => cust.id === customer.id);

            if (existingIndex !== -1) {
                state.customers[existingIndex] = customer;
            } else {
                customer.id = state.customers.length + 1;
                state.customers.push(customer);
            }
        }
    },
    getters: {
        getCustomers: (state) => state.customers.map((customer) => {
            return {
                value: customer.id,
                text: `${customer.firstName} ${customer.lastName}`
            }
        }),
        customersLength: (state) => state.customers.length,
        applicationLength: (state) => state.applications.length
    },
});

export default store;