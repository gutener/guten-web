<template>
  <div>
    <!-- Editor Mode -->
    <div class="medium-editor-container" v-if="!readOnly">
      <insert-embed v-if="editor"
                    :uploadUrl="options.uploadUrl"
                    :onChange="triggerChange"
                    :editorRef="$refs.editor"
                    :editor="editor"
                    v-on:uploaded="uploadedCallback"></insert-embed>
      <list-handler v-if="editor"
                    :editor="editor"
                    :onChange="triggerChange"></list-handler>
      <div class="editor"
           v-bind:class="editorClass"
           v-html="prefill"
           ref="editor">
      </div>
    </div>
    <!-- Read Only Mode -->
    <read-mode v-if="readOnly" :content="prefill"></read-mode>
  </div>
</template>

<script>
  import MediumEditor from 'medium-editor'
  import InsertEmbed from './libs/InsertEmbed'
  import ListHandler from './libs/ListHandler'
  import ReadMode from './libs/ReadMode'
  import _ from 'underscore'
  import TCMention from './libs/tc-mention'
  import MentionSearch from './Search.vue'
  import Vue from 'vue'

  export default {
    name: "medium-editor",
    data() {
      return {
        editor: null,
        defaultOptions: {
          forcePlainText: false,
          placeholder: {
            text: "Write something great!!"
          },
          toolbar: {
            buttons: ['bold', 'italic', 'quote', 'h1', 'h2', 'h3', 'h4', 'orderedlist']
          },
          extensions: {
            "mention": new TCMention({
              tagName: "a",
              renderPanelContent: function (panelEl, currentMentionText, selectMentionCallback) {
                panelEl.innerHTML = ''
                const Search = Vue.extend(MentionSearch)
                const SearchComp = new Search({
                  propsData: {
                    mentionText: currentMentionText,
                  }
                }).$mount()

                SearchComp.$watch('mentionText', function (value) {
                  SearchComp.query(value)
                },{immediate: true})

                SearchComp.$on('selectMentionCallback', function (mention) {
                  selectMentionCallback(mention)
                })

                panelEl.appendChild(SearchComp.$el)
              },
              activeTriggerList: ["#", "@"]
            })
          }
        },
        hasContent: false
      };
    },
    props: ["options", "onChange", "prefill", "readOnly"],
    computed: {
      editorOptions() {
        return _.extend(this.defaultOptions, this.options);
      },
      editorClass() {
        return {
          'has-content': this.hasContent
        }
      }
    },
    components: {
      InsertEmbed,
      ListHandler,
      ReadMode,
      MentionSearch
    },
    mounted() {
      if (!this.readOnly) {
        this.createElm()
      }
    },
    methods: {
      createElm() {
        this.editor = new MediumEditor(this.$refs.editor, this.editorOptions);

        if (this.prefill) {
          this.hasContent = /<[a-z][\s\S]*>/i.test(this.prefill);
          this.$refs.editor.focus();
        }

        this.editor.subscribe("editableInput", this.triggerChange);
      },
      destroyElm() {
        this.editor.destroy()
      },
      triggerChange() {
        const content = this.editor.getContent()
        setTimeout(() => {
          this.hasContent = /<[a-z][\s\S]*>/i.test(content)
        }, 0)

        this.$emit("input", content)

        if (this.onChange) {
          this.onChange(content)
        }
      },
      uploadedCallback(url) {
        this.$emit("uploaded", url)
      }
    },
    destroyed() {
      console.log('destroy medium editor')
      this.destroyElm()
    }
  };
</script>
<style lang="less">
  @import "~bulma/css/bulma.css";
  @import "~medium-editor/dist/css/medium-editor.css";
  @import "themes/default.less";

  .medium-editor-mention-panel {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background-color: #fbfffe;
    font-size: 16px;
    left: 0;
    line-height: 1.4;
    min-height: 100px;
    min-width: 260px;
    position: absolute;
    text-align: center;
    top: 0;
    word-break: break-all;
    word-wrap: break-word;
    visibility: hidden;
    overflow: hidden;
    z-index: 1000;
    border: 1px solid rgba(0, 0, 0, 0.15);
    box-shadow: rgba(101, 119, 134, 0.2) 0px 0px 15px, rgba(101, 119, 134, 0.15) 0px 0px 3px 1px;
    .progressbar{
      padding: 0 2px;
      .progressbar_line{
        height: 0.2rem;
        background: linear-gradient(90deg, #00d1b2 25%, #5ef7e0 37%, #00d1b2 63%);
        background-size: 400% 100%;
        -webkit-animation: ant-skeleton-loading 1.4s ease infinite;
        animation: skeleton-loading 1.4s ease infinite;
      }
    }
    .mention-search__col {
      border-bottom-width: 1px;
      border-bottom-style: solid;
      border-bottom-color: rgb(230, 236, 240);
      &:hover{
        background-color: rgba(0, 209, 178, 0.03);
      }
      .mention-search__item{
        transition-property: background-color, box-shadow;
        transition-duration: 0.2s;
        padding: 15px;
        cursor: pointer;
        text-align: left;
        .item_body{
          span{
            color: rgb(20, 23, 26);
            -webkit-box-direction: normal;
            -webkit-box-orient: horizontal;
            flex-direction: row;
            font-weight: bold;
            font-size: 15px;
          }
        }
      }
    }
  }
  @-webkit-keyframes skeleton-loading {
    0% {
      background-position: 100% 50%
    }
    to {
      background-position: 0 50%
    }
  }

  @keyframes skeleton-loading {
    0% {
      background-position: 100% 50%
    }
    to {
      background-position: 0 50%
    }
  }
  .medium-editor-mention-panel-active {
    visibility: visible;
    overflow: visible;
  }
</style>