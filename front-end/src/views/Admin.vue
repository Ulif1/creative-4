<template>
<div class="admin blur">
  <h1>Roster Page</h1>
  <div class="heading">
    <h2>Add an Athete</h2>
  </div>
    <div class="add">
      <div class="form">
        <input v-model="name" placeholder="Name">
        <p></p>
        <textarea v-model="description" placeholder="Career Description"></textarea>
        <p></p>
        <input v-model="medals" placeholder="Olympic Medals Won">
        <p></p>
        <input type="file" name="photo" @change="fileChanged">
        <p></p>
        <button class="btn btn-primary" @click="upload">Upload</button>
      </div>
      <div class="upload" v-if="addAthlete">
        <h2>{{addAthlete.name}}</h2>
        <img :src="addAthlete.path" />
	<p>{{addAthlete.description}}</p>
      </div>
    </div>
  <div class="heading">
    <h2>Edit/Remove an Athlete</h2>
  </div>
    <div class="row">
      <div class="form col-sm-3">
        <input v-model="findName" placeholder="Search">
        <div class="suggestions" v-if="suggestions.length > 0">
          <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectAthlete(s)">{{s.name}}
          </div>
        </div>
      </div>
      <div class="container col-sm-6">
        <div class="upload row" v-if="findAthlete">
          <div class="col-sm-8">
            <input v-model="findAthlete.name">
            <p></p>
            <img :src="findAthlete.path" />
          </div>
          <div class="col-sm-4">
            <h5>Edit Description</h5>
            <textarea v-model="findAthlete.description"></textarea>
            <h5>Edit Medal Count</h5>
            <input v-model="findAthlete.medals">
          </div>
        </div>
        <div class="actions" v-if="findAthlete">
          <button class="btn btn-primary" @click="deleteAthlete(findAthlete)">Remove</button>
          <button class="btn btn-primary" @click="editAthlete(findAthlete)">Edit</button>
        </div>
      </div>
    </div>
</div>
</template>

<style scoped>
.btn{
  margin: 2px;
}

.admin{
  border-radius: 10px;
}

.blur{
  backdrop-filter: blur(5px);
}

.image h2 {
  font-style: italic;
  font-size: 1em;
}

.heading {
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

.form {
  margin-right: 50px;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}

/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion:hover {
  background-color: #3333FF;
  color: #fff;
}
</style>

<script>
import axios from 'axios';

export default{
  name: "Admin",
  data(){
    return {
      name: "",
      file: null,
      description: "",
      medals: "",
      addAthlete: null,
      athletes: [],
      findName: "",
      findAthlete: null,
    }
  },
  computed: {
    suggestions() {
      let athletes = this.athletes.filter(athlete => athlete.name.toLowerCase().startsWith(this.findName.toLowerCase()));
      return athletes.sort((a, b) => a.name > b.name);
    }
  },
  created(){
    this.getAthletes();
  },
  methods: {
    fileChanged(event){
      this.file = event.target.files[0];
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/athletes', {
          name: this.name,
          path: r1.data.path,
          description: this.description,
          medals: this.medals,
        });
        this.addAthlete = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getAthletes() {
      try {
        let response = await axios.get("/api/athletes");
        this.athletes = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectAthlete(athlete) {
      this.findName = "";
      this.findAthlete = athlete;
    },
    async deleteAthlete(athlete) {
      try {
        await axios.delete("/api/athletes/" + athlete._id);
        this.findAthlete = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editAthlete(athlete) {
      try {
        await axios.put("/api/athletes/" + athlete._id, {
          name: this.findAthlete.name,
          description: this.findAthlete.description,
          medals: this.findAthlete.medals,
        });
        this.findAthlete = null;
        this.getAthletes();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>
