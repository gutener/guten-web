<template>
  <div>
    <div class="mention-search__col" v-for="(mention, index) in mentions" :key="mention.id">
      <div class="mention-search__item" @click="mentionCallback(index)">
        <div class="item_body">
          <span>{{mention.tag_name}}</span>
        </div>
      </div>
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
        setTimeout(() => {
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
                    val.text=val.tag_name.substring(1, val.tag_name.length)
                    val.url=`/hashtag/${val.text}?src=hashtag_click`
                  }
                })
              })
              .catch(error => {
                console.error(error)
              })
        }, 800)
      }
    }
  }
</script>