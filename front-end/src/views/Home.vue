<template>
<div class="home">
  <section class="row">
    <div class="col-sm-3" v-for="athlete in athletes" :key="athlete.id">
      <div class="image">
        <h2 class="centered">{{athlete.name}}</h2>
        <img class="img-responsive" :src="athlete.path" />
        <p class="desc">{{athlete.description}}</p>
        <p class="desc">Medals won: {{athlete.medals}}</p>
      </div>
    </div>
  </section>
</div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
     athletes: [],
    }
  },
  created() {
    this.getAthletes();
  },
  methods: {
    async getAthletes() {
      try {
        let response = await axios.get("/api/athletes");
        this.athletes = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
}
</script>

<style scoped>
.image h2 {
  font-style: italic;
}

.image {
  color: white;
  padding: 3px;
  background-color: #222d;
  border-radius: 15px;
  backdrop-filter: blur(2px);
}

.desc{
  padding: 5px;
}
</style>
