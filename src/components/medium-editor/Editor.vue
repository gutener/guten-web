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
                    mentionText: currentMentionText
                  },
                  methods: {}
                }).$mount()

                const trigger = currentMentionText.substring(0, 1)
                SearchComp.$on('selectMentionCallback', function (mention) {
                  mention.text = trigger + mention.text
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
    font-size: 16px;
    left: 0;
    line-height: 1.4;
    min-width: 100px;
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
    background-color: white;

    .mention-search__col {
      -ms-flex-align: stretch;
      -ms-flex-direction: column;
      -ms-flex-negative: 0;
      -ms-flex-preferred-size: auto;
      -webkit-align-items: stretch;
      -webkit-box-align: stretch;
      -webkit-box-direction: normal;
      -webkit-box-orient: vertical;
      -webkit-flex-basis: auto;
      -webkit-flex-direction: column;
      -webkit-flex-shrink: 0;
      align-items: stretch;
      border: 0 solid black;
      box-sizing: border-box;
      display: -webkit-box;
      display: -moz-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      flex-basis: auto;
      flex-direction: column;
      flex-shrink: 0;
      margin-bottom: 0px;
      margin-left: 0px;
      margin-right: 0px;
      margin-top: 0px;
      min-height: 0px;
      min-width: 0px;
      padding-bottom: 0px;
      padding-left: 0px;
      padding-right: 0px;
      padding-top: 0px;
      position: relative;
      z-index: 0;
    }
  }

  .medium-editor-mention-panel-active {
    visibility: visible;
    overflow: visible;
  }
</style>