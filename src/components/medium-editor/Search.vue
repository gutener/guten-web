<template>
  <div>
    <div class="mention-search__col" v-for="(mention, index) in mentions" :key="mention.id">
      <button @click="mentionCallback(index)">{{mention.text}}</button>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'MentionSearch',
    data() {
      return {
        trigger:'',
        mentions: [
          {
            id: '232d233',
            text: '111',
            url:'https://www.google.com'
          },
          {
            id: '232d2',
            text: '222',
            url:'https://www.twitter.com'
          }
        ]
      }
    },
    props: {
      mentionText: {
        type: String,
        required: true
      },
    },
    methods: {
      mentionCallback(index) {
        const selectedMention=this.mentions[index]
        this.$emit('selectMentionCallback', selectedMention)
      }
    }
  }
</script>