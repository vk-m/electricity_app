<template>
    <div>
        <h2>Список заяв</h2>
        <div class="application-manage">
            <ManageApplication :key="key" @update="update()" />
            <div class="data-picker">
                <VaDateInput v-model="valueDate" :readonly="false" />
            </div>
        </div>

        <VaDataTable :items="filteredApplications" :columns="columns" noDataHtml="Немає заяв">
            <template #cell(files)="{ rowData }">
                <VaButton v-for="(file, index) in rowData.files" :key="index" preset="plain" icon="picture_as_pdf" @click="openFile(file)" />
            </template>
            <template #cell(actions)="{ rowData }">
                <div class="actions">
                    <ManageApplication :rowData="rowData" :key="rowData.id" @update="update()" />

                    <VaButton preset="plain" icon="print" @click="printApplication(rowData)" />
                </div>
            </template>
        </VaDataTable>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

import ManageApplication from './ManageApplication.vue';

export default {
    components: { ManageApplication },
    data() {
        return {
            key: uuidv4(),
            valueDate: {
                start: this.datePlusDay(new Date(), -7), end: new Date()
            },
            filteredApplications: this.filterApplications(),
            columns: [
                { key: "id" },
                { key: "formattedDate", label: "Дата" },
                { key: "customer.text", name: "customer", label: "Замовник" },
                { key: "power", label: "Потужність" },
                { key: "reason.text", name: "reason", label: "Причина звернення" },
                { key: "files", label: "Файли" },
                { key: "actions", width: 80, label: "Дії" },
            ],
        };
    },
    computed: {
        ...mapState(['applications']),
    },
    watch: {
        valueDate() {
            this.filterApplications()
            console.log(this.filterApplications())
        },
        applications() {
            this.filterApplications()
            console.log(this.filterApplications())
        }
    },
    methods: {
        filterApplications() {
            this.$nextTick(() => {

                this.filteredApplications = !this.applications ? [] : this.applications.filter(application => moment(application.date).isAfter(moment(this.valueDate.start).add(-1, 'days')) && moment(application.date).isBefore(moment(this.valueDate.end).add(1, 'days')))
            })
        },
        openFile(file) {
            const url = URL.createObjectURL(file);
            const newWindow = window.open(url, '_blank');
            newWindow.focus();
        },
        printApplication(application) {
            const printContent = `
                <h2>Заява №${application.id}</h2>
                <p><strong>Дата створення:</strong> ${application.date}</p>
                <p><strong>Причина звернення:</strong> ${application.reason === '1' ? 'Нове підключення' : 'Збільшення потужності'
                }</p>
                <p><strong>Коментар:</strong> ${application.comment}</p>
                <p><strong>Потужність:</strong> ${application.power} кВт</p>
                <p><strong>Замовник:</strong> ${application.customer || 'Невідомо'}</p>
            `;

            const printWindow = window.open('', '_blank');
            printWindow.document.write(`<html><head><title>Друк заявки</title></head><body>${printContent}</body></html>`);
            printWindow.document.close();
            printWindow.print();
        },
        editApplication(id) {
            this.$router.push({ name: 'manageApplication', params: { id } });
        },
        viewApplication(id) {
            alert(`Перегляд заявки №${id}`);
        },
        datePlusDay(date, days) {
            const d = new Date(date);
            d.setDate(d.getDate() + days);
            return d;
        },
        update() {
            this.key = uuidv4();
            this.filterApplications()
        }
    },
};
</script>

<style scoped>
.actions {
    display: flex;
}
.application-manage {
    display: flex;
    align-items: center;
}
.data-picker {
    margin-top: 6px;
}
</style>
