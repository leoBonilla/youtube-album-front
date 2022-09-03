<template>
  <div class="text-center youtube" >
    <span v-if="isLoading">Obteniendo videos...</span>
    <span v-else-if="isError">Error: {{ error.message }}</span>
    <w-flex wrap class="text-center" v-else>
      
      <div class="xs12 md12 lg12 xl2">
        <div class="title">  {{ title?.substring(0, 30) + ".." }}</div>
        <div>
          <div class="delete-icon" >
            <w-button @click.self="showAlert" class="ma1" bg-color="error" icon="wi-cross" md></w-button>
          </div>
          <img :src="thumb" class="thumb"  @click="dialog.show = true"/>
        </div>

      </div>
    </w-flex>
  </div>


  <w-dialog v-model="dialog.show" title="Detalles del video" persistent :width="1024">
    <template #actions>
      <w-flex wrap class="text-center">
        <div class="xs8">
          <iframe width="560" height="315" :src="embed" frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>

        <div class="xs4">
          {{ description?.substring(0, 200) + "..." }}
          <w-button class="mr2" @click="dialog.show = false" bg-color="error">
            Cerrar
          </w-button>
        </div>
        <div class="spacer" />
      </w-flex>
    </template>
  </w-dialog>
</template>
<script>
import { useQuery } from "vue-query";
import { defineComponent } from "vue";
import { ref } from 'vue';

export default {
  name: 'YoutubeBox',
  props: {
    id: String,
    youtubeId: String,
    link: String
  },
  
  data() {

    return {
      dialog: { show: false },
      embed: "https://www.youtube.com/embed/" + this.youtubeId,
      description: null,
      title: null,
      thumb: null
    }
  },
  methods: {
    showAlert() {
      // Use sweetalert2
      this.$swal({
            title: "Eliminar video",
            text: "Estás seguro que deseas quitar este video del album?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Si",
            cancelButtonText: "No",
            closeOnConfirm: false
        }).then((result) => {
            if (result.value) {
              fetch('https://5g094irhc7.execute-api.us-east-1.amazonaws.com/video/a78e8120-2f75-4ae5-996d-2034a64616e5', { method: 'DELETE' })
    .then(() => this.status = 'Delete successful');
            }
        });   
    },
  },
  setup() {
    const message = ref(false);
    function showElement() {
      
    }
    return { message, showElement };
  },
  created() {
    fetch("https://www.googleapis.com/youtube/v3/videos?id=" + this.youtubeId + "&key=AIzaSyB7aZObcHdBRR8qyIb_VPwWUzQzUwnTppg&part=snippet")
      .then(async response => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        this.description = data.items[0].snippet.description;
        this.title = data.items[0].snippet.title;
        this.thumb = data.items[0].snippet.thumbnails.medium.url;
      })
      .catch(error => {
        this.errorMessage = error;
        console.error("There was an error!", error);
      });
  },
}
</script>

