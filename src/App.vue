<template>
  <VaButton @click="applicationLists" size="small" color="info">Список заяв</VaButton>
  <VaButton @click="customerDirectory" size="small" color="info">Довідник замовників</VaButton>

  <router-view />
</template>

<script>
export default {
  name: 'App',
  methods: {
    applicationLists() {
      this.$router.push('/');
    },
    customerDirectory() {
      this.$router.push('/customers');
    }
  }
};
</script>

<style scoped>
  button {
    margin-left: 10px;
  }
</style>
