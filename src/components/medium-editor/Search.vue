<template>
  <div>
    <div class="mention-search__col" v-for="(mention, index) in mentions" :key="mention.id">
      <button @click="mentionCallback(index)">{{mention.tag_name}}</button>
    </div>
  </div>
</template>

<script>
  import {querytags} from '@/api/biz'

  export default {
    name: 'MentionSearch',
    data() {
      return {
        trigger: '',
        mentions: []
      }
    },
    props: {
      mentionText: {
        type: String,
        required: true
      }
    },
    methods: {
      mentionCallback(index) {
        const selectedMention = this.mentions[index]
        this.$emit('selectMentionCallback', selectedMention)
      },
      query(mentionText) {
        const query = mentionText.substring(1, mentionText.length)
        const params = {
          'q': query,
        }
        querytags(params)
            .then(response => {
              this.mentions = response
              const trigger = this.mentionText.substring(0, 1)
              this.mentions.forEach((val) => {
                if(trigger==='#'){
                  val.url=`/hashtag/${val.tag_name}?src=hashtag_click`
                }
              })
            })
            .catch(error => {
              console.error(error)
            })
      }
    }
  }
</script>