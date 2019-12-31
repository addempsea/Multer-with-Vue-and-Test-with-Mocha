<template>
  <div class="file">
   <form @submit.prevent="onSubmit" enctype="multipart/form-data">
      <div class="fields">
        <label>Upload File</label><br/>
        <input 
          type="file"
          ref="file"
          @change="onSelect"
        />
      </div>
      <div class="fields">
        <button>Submit</button>
      </div>
      <div class="message">
        <h5>{{message}}</h5>
      </div>
   </form>
   <div v-for="(item, index) in demo" :key="index">
     <img class="logo" :src= item.image alt="My_Logo">
   </div>
   
   <button >
     click me
   </button>
  </div>
</template>

<script>

import axios from 'axios';
export default {
  name: 'FileUpload',
  data() {
    return {
      file:"",
      message:"",
      demo: [],
      whole: []
    }
  },

  async mounted() {
    const response = await axios.get('http://localhost:5000/users/demo');
    this.demo = response.data.data
  },
  
  methods: {
    onSelect(){
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      const file = this.$refs.file.files[0];
      this.file = file;
      if(!allowedTypes.includes(file.type)){
        this.message = "Filetype is wrong!!"
      }
      if(file.size>500000){
        this.message = 'Too large, max size allowed is 500kb'
      }
    },
    async onSubmit(){
      const formData = new FormData();
      formData.append('file',this.file);
      try{
        const response = await axios.post('http://localhost:5000/users/file',formData);
        console.log(response);
        this.message = response.data;
        // this.demo = 'http:localhost:5000/images/'+ response.data.fileUrl
      }
      catch(err){
        console.log(err.message);
        this.message = err.response.data.error
      }
    }
  },
}
</script>