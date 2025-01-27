<template>
    <div>
        <h2>Довідник замовників</h2>

        <ManageCustomer :key="key" @generateNewKey="generateNewKey" />

        <VaDataTable :items="customers" :columns="columns" noDataHtml="Немає замовників">
            <template #cell(actions)="{ rowData }">
                <ManageCustomer :rowData="rowData" :id="rowData.id" />
            </template>
        </VaDataTable>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { v4 as uuidv4 } from 'uuid';
import ManageCustomer from './ManageCustomer.vue';

export default {
    components: { ManageCustomer },
    data() {
        return {
            key: uuidv4(),
            columns: [
                { key: "id" },
                { key: "firstName", name: "firstName", label: "Імя" },
                { key: "lastName", name: "lastName", label: "Прізвище" },
                { key: "address", name: "address", label: "Адреса" },
                { key: "other", name: "other", label: "Інше" },
                { key: "actions", width: 80, label: "Дії" },
            ]
        };
    },
    computed: {
        ...mapState(['customers']),
    },
    methods: {
        generateNewKey() {
            this.key = uuidv4();
        }
    }
};
</script>