<template>
  <div class="dashboard">
   <MyField />

    <span v-if="isLoading">Obteniendo videos...</span>
    <span v-else-if="isError">Error: {{ error.message }}</span>
    <!-- We can assume by this point that `isSuccess === true` -->
    <w-flex wrap class="text-center" v-else>
      <div class="wrap-caja xs12 md6 lg4 xl2 pa1" v-for="todo in data.body.videos" :key="todo.id">
        <YoutubeBox :id="todo.id" :link="todo.link" :youtubeId="todo.youtubeId" />
      </div>
    </w-flex>
  </div>



</template>

<script>
import { defineComponent } from "vue";
import { useQuery } from "vue-query";
import YoutubeBox from './YoutubeBox';
import MyField from './MyField';

const getAll = async () => {
  const response = await fetch("https://5g094irhc7.execute-api.us-east-1.amazonaws.com/listar");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}


export default {
  name: 'MyDashboard',
  props: {
    msg: String
  },
  data: () => ({
    form: {
      valid: null,
      submitted: false,
      sent: false,
      errorsCount: 0
    },
    validators: {
      required: value => !!value || 'Por favor ingresa el link del video'
    },
  }),
  methods: {
      onSuccess() {
        console.log('asdf')
        setTimeout(() => (this.form.sent = true), 2000)
      },
      onValidate() {
        this.form.sent = false
        this.form.submitted = this.form.errorsCount === 0
      }
    }
}
</script>

<script setup>

function useTodosQuery() {
  return useQuery("todos", getAll);
}


const { isLoading, isError, data, error } = useTodosQuery();
</script>