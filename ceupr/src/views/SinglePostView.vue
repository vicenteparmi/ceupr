<script setup>
import { getDatabase, get, ref } from "firebase/database";
</script>

<script>
export default {
  name: "SinglePostView",
  data() {
    return {
      post: {},
    };
  },
  mounted() {
    this.getPost();
  },
  methods: {
    getPost() {
      const db = getDatabase();
      const dbref = ref(db, "posts/" + this.$route.params.id);
      get(dbref)
        .then((snapshot) => {
          if (snapshot.exists()) {
            this.post = {
              id: snapshot.key,
              title: snapshot.val().title,
              subtitle: snapshot.val().subtitle,
              content: snapshot.val().content,
              date: snapshot.val().date,
            };
          } else {
            console.log("No data available");
          }
        })
        .then(() => {
          // Format content into paragraphs
          this.post.content = this.post.content
            .split("\n")
            .map((paragraph) => {
              return `<p>${paragraph}</p>`;
            })
            .join("");
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<template>
  <div>
    <transition name="fadeup" mode="out-in">
      <h2 class="title" style="color: var(--tertiary)">
        <span class="material-symbols-rounded icon" v-on:click="$router.go(-1)">
          arrow_back_ios_new</span
        >
        {{ post.title }}
      </h2>
    </transition>
    <transition name="fadeup" mode="out-in">
      <div class="post">
        <p class="post__date">
          Publicado em {{ new Date(post.date).toLocaleDateString() }} às
          {{ new Date(post.date).toLocaleTimeString() }}
        </p>
        <p class="post__subtitle">{{ post.subtitle }}</p>
        <hr />
        <p class="post__content" v-html="post.content"></p>
      </div>
    </transition>
  </div>
</template>

<style>
.title {
  line-height: 1.25;
}

.post {
  display: flex;
  flex-direction: column;
  width: 90%;
  color: var(--on-surface);
  margin-left: 42px;
}

.post__date {
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 8px;
  color: var(--tertiary);
}

.post__subtitle {
  font-size: 20px;
  font-weight: 500;
  margin-top: 8px;
}

.post__content {
  font-size: 16px;
  font-weight: 400;
  margin-top: 8px;
  text-align: justify;
  text-indent: 24px;
}

hr {
  margin-top: 24px;
  margin-bottom: 24px;
  border: 1px solid var(--tertiary);
  opacity: 0.5;
}

p {
  margin-bottom: 8px;
}

@media screen and (max-width: 600px) {
  .post {
    width: 100%;
    margin-left: 0;
    margin-top: 24px;
  }
}
</style>
