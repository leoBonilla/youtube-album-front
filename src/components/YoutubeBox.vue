<template>
 <div>
 <span v-if="isLoading">Obteniendo videos...</span>
 <span v-else-if="isError">Error: {{ error.message }}</span>
 <w-flex wrap class="text-center" v-else>
  <div class="xs12 md6 lg4 xl2" @click="dialog.show = true">
    {{title?.substring(0,30)+".." }}  <w-icon
    class="mr1"
    sm
    color="primary">
    mdi mdi-delete
  </w-icon>
   <img :src="thumb"/>
  
  </div>
  </w-flex>
 </div>



 <w-dialog
 v-model="dialog.show"
 title="Detalles del video"
 persistent
 :width="1024">
 
 <template #actions>
    <w-flex wrap class="text-center">
        <div  class="xs8">
            <iframe
        width="560"
        height="315"
        :src="embed"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
        </div>
        
        <div class="xs4">
            {{description?.substring(0,200)+"..."}}
            <w-button
     class="mr2"
     @click="dialog.show = false"
     bg-color="error">
     Cerrar
   </w-button>
        </div  >
        <div class="spacer" />
   
        </w-flex>
    
   
 </template>
</w-dialog>
</template>
<script>
import { useQuery } from "vue-query";
import { defineComponent } from "vue";

export default {
  name: 'YoutubeBox',
  props: {
    id: String,
    youtubeId: String,
    link: String
  },
  data () {
    
    return {
      dialog: { show: false },
      embed: "https://www.youtube.com/embed/"+ this.youtubeId,
      description: null,
      title: null,
      thumb: null
    }
  },
  created (){
    fetch("https://www.googleapis.com/youtube/v3/videos?id="+ this.youtubeId+"&key=AIzaSyB7aZObcHdBRR8qyIb_VPwWUzQzUwnTppg&part=snippet")
    .then(async response => {
      const data = await response.json();

      // check for error response
      if (!response.ok) {
        // get error message from body or default to response statusText
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
      this.description= data.items[0].snippet.description;
      this.title= data.items[0].snippet.title;
      this.thumb= data.items[0].snippet.thumbnails.medium.url;
    })
    .catch(error => {
      this.errorMessage = error;
      console.error("There was an error!", error);
    });
   },
}
</script>

