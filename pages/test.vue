<script setup lang="ts">
import debounce from 'lodash.debounce';
import type { SearchResponse } from '@nuxtjs/algolia';
// const { data } = await useAsyncAlgoliaSearch({ indexName: 'products ', query: 'Змей' })
const query = ref('');

const searchResults = ref<SearchResponse<unknown> | null>(null);


  
const search = debounce(async () =>{
  console.log('Отправка запроса:', query.value); // Лог для отладки
  if(query.value.trim()){
    const { result, search } = await useAlgoliaSearch('products')
    await search({query:query.value})
    searchResults.value = result.value;
    console.log(searchResults.value)
  }
  else{
    searchResults.value = null;
  }
    
},300);

// Автоматический поиск при изменении query
watch(query, () => {
  search(); // Запустить поиск при изменении запроса
});
</script>
<template>
<div class="search-container">
    <!-- Поисковое поле -->
    <input
      v-model="query"
      type="text"
      placeholder="Введите название товара..."
      class="search-input"
    />

    <!-- Результаты -->
    <div v-if="query.trim()">
      <p>Поиск по запросу: "{{ query }}"</p>
      <pre>{{ searchResults }}</pre>
    </div>
  </div>
</template>