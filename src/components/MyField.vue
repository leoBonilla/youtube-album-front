<template>
    <w-form method="POST" action="" @submit="submit" @validate="onValidate" @success="onSuccess" v-model="form.valid"
        v-model:errors-count="form.errorsCount">
        <w-flex wrap class="text-center search-fields">
            <div class="xs12 md8">
                <w-input label="Url de youtube" :validators="[validators.required]" v-model="link"
                type="text"
                name="link"></w-input>
            </div>

            <div class="xs12 md4">
                <w-button type="submit" :disabled="form.valid === false" :loading="form.submitted && !form.sent">
                    Guardar</w-button>
            </div>
        </w-flex>
    </w-form>


</template>
  <script>
  import { defineComponent } from "vue";
  import { ref } from 'vue';
  
  export default {
      name: 'MyField',
      props: {
      },
      data: () => ({
          form: {
              valid: null,
              submitted: false,
              sent: false,
              errorsCount: 0,
              link: null
          },
          validators: {
              required: value => !!value || 'Por favor ingresa el link del video'
          },
      }),
      methods: {
          onSuccess() {
              setTimeout(() => (this.form.sent = true), 2000)
              const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ link: this.link })
  };
  fetch('https://5g094irhc7.execute-api.us-east-1.amazonaws.com/add', requestOptions)
    .then(async response => {
      const data = await response.json();

      // check for error response
      if (!response.ok) {
        // get error message from body or default to response status
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
      }

      this.postId = data.id;
    })
    .catch(error => {
      this.errorMessage = error;
      console.error('There was an error!', error);
    });

          },
          onValidate() {
              this.form.sent = false
              this.form.submitted = this.form.errorsCount === 0
          },
          submit() {
              
          }
      },
      setup() {
      },
      created() {
  
      },
  }
  </script>
  
  