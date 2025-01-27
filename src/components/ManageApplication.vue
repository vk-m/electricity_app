<template>
    <VaButton v-if="!rowData" @click="showModal = !showModal" color="info" icon="add" class="add-button" />
    <VaButton v-else @click="showModal = !showModal" preset="plain" icon="edit" class="add-button" />

    <VaModal v-model="showModal" close-button hide-default-actions size="small">
        <h3>
            {{ rowData ? "Редагування заяви" : "Створення нової заяви" }}
        </h3>

        <VaForm class="form">
            <VaInput v-model="application.id" type="text" label="Номер заяви:" />

            <VaDateInput v-model="application.date" label="Дата створення:" />

            <VaSelect v-model="application.reason" label="Причина звернення:" :options="optionReasons" />

            <VaTextarea v-model="application.comment" label="Коментар:" />

            <VaCounter v-model="application.power" type="number" step="0.01" min="0" manual-input label="Потужність:" />

            <VaSelect v-model="application.customer" label="Замовник:" :options="this.$store.getters.getCustomers" searchable>
                <template #append>
                    <ManageCustomer :key="this.$store.getters.customersLength" />
                </template>
            </VaSelect>

            <VaFileUpload v-model="application.files" dropzone file-types="doc,docx,pdf" />
        </VaForm>

        <template #footer>
            <VaButton type="submit" @click="saveApplicationToStore()">{{ rowData ? 'Зберегти' : 'Створити' }}</VaButton>
        </template>
    </VaModal>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import moment from 'moment';
import ManageCustomer from './ManageCustomer.vue';

export default {
    components: { ManageCustomer },
    props: ['rowData'],
    data() {
        return {
            showModal: false,
            application: {
                id: '',
                date: new Date(),
                reason: '',
                comment: '',
                power: 0,
                customer: '',
                files: [],
            },
            optionReasons: [
                { value: '1', text: 'Нове підключення' },
                { value: '2', text: 'Збільшення потужності' }
            ]
        }
    },
    computed: {
        ...mapState(['customers']),
    },
    mounted() {
        if (this.rowData != null) {
            this.application.id = this.rowData.id
            this.application.date = this.rowData.date
            this.application.reason = this.rowData.reason
            this.application.comment = this.rowData.comment
            this.application.power = this.rowData.power
            this.application.customer = this.rowData.customer
            this.application.files = this.rowData.files
        }
    },
    methods: {
        ...mapMutations(['saveApplication']),
        saveApplicationToStore() {
            this.application.formattedDate = moment(this.application.date).format('DD-MM-YYYY')

            this.saveApplication(this.application);
            this.showModal = false;

            this.$emit('update')
        }
    }
};
</script>
