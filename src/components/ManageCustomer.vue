<template>
    <VaButton v-if="!rowData" @click="showModal = !showModal" color="info" icon="add" class="add-button" />
    <VaButton v-else @click="showModal = !showModal" color="info" icon="edit" class="add-button" />

    <VaModal v-model="showModal" close-button hide-default-actions size="small" class="modal">
        <h3 class="va-h3">
            {{ rowData ? "Редагувати" : "Створити" }} замовника
        </h3>
        
        <VaForm class="form">
            <VaInput v-model="customer.firstName" type="text" label="Імя" />

            <VaInput v-model="customer.lastName" type="text" label="Прізвище" />

            <VaInput v-model="customer.address" type="text" label="Адреса" />

            <VaInput v-model="customer.other" type="text" label="Інше" />
        </VaForm>

        <template #footer>
            <VaButton class="submit-button" type="submit" @click="saveCustomerToStore()">{{ rowData ? 'Зберегти' : 'Створити' }}</VaButton>
        </template>
    </VaModal>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    props: ['rowData'],
    data() {
        return {
            showModal: false,
            customer: {
                id: '',
                firstName: '',
                lastName: '',
                address: '',
                other: '',
            }
        };
    },
    mounted() {
        if (this.rowData != null) {
            this.customer.id = this.rowData.id
            this.customer.firstName = this.rowData.firstName
            this.customer.lastName = this.rowData.lastName
            this.customer.address = this.rowData.address
            this.customer.other = this.rowData.other
        }
    },
    computed: {
        ...mapState(['customers']),
    },
    methods: {
        ...mapMutations(['saveCustomer']),
        saveCustomerToStore() {
            this.saveCustomer(this.customer);
            this.showModal = false;

            this.$emit('generateNewKey')
        }
    },
};
</script>
