<template>
  <div class="dashboard">
  <w-form  @validate="onValidate"
  @success="onSuccess" method="POST" action=""
  v-model="form.valid"
    v-model:errors-count="form.errorsCount"
  >
  <w-flex wrap class="text-center">
  <div  class="xs8">
  <w-input label="Url de youtube" :validators="[validators.required]"></w-input>
  </div>
  
  <div class="xs4">
  <w-button type="submit"  :disabled="form.valid === false"
  :loading="form.submitted && !form.sent"
  class="my1">Submit</w-button>
  </div  >
  
  </w-flex>
</w-form>

<span v-if="isLoading">Obteniendo videos...</span>
  <span v-else-if="isError">Error: {{ error.message }}</span>
  <!-- We can assume by this point that `isSuccess === true` -->
  <w-flex wrap class="text-center" v-else>
  <div class="xs12 md6 lg4 xl2 pa1" v-for="todo in data.body.videos" :key="todo.id">
  <YoutubeBox :id="todo.id" :link="todo.link" :youtubeId="todo.youtubeId"/>
  </div>
  </w-flex>
  </div>



</template>

<script>
import { defineComponent } from "vue";
import { useQuery} from "vue-query";
import YoutubeBox from './YoutubeBox';

const getAll = async () => {
  const response = await fetch("https://5g094irhc7.execute-api.us-east-1.amazonaws.com/listar");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}


export default defineComponent({
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
  methods: {
  onSuccess () {
    setTimeout(() => (this.form.sent = true), 2000)
  },
  onValidate () {
    this.form.sent = false
    this.form.submitted = this.form.errorsCount === 0
  }
} 

}),
})
</script>

<script setup>

function useTodosQuery() {
  return useQuery("todos", getAll);
}


const { isLoading, isError, data, error } = useTodosQuery();
</script>