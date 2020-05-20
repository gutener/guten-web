<template>
  <button class="btn-toggle" v-on:click="addEmbed">
    <svg-icon iconClass="blibli"></svg-icon>
  </button>
</template>
<script>

  import _ from "underscore";

  export default {
    props: [
      'editor',
      'insert'
    ],
    mounted() {
      this.subscribe()
      this.initializeExisting()
    },
    methods: {
      subscribe() {
        this.editor.subscribe('editableKeyup', this.detectEmbed)
      },
      unsubscribe() {
        this.editor.unsubscribe('editableKeyup', this.detectEmbed)
      },
      initializeExisting() {
        setTimeout(() => {
          const focused = this.editor.getFocusedElement()
          if (!focused) return false;
          const editorEmbeds = focused.getElementsByClassName('editor-embed')
          _.map(editorEmbeds, (elm) => {
            const nextElm = elm.nextElementSibling
            const link = elm.getElementsByTagName('a')[0]
            if (!link) return;

            const url = link.getAttribute('href')
            nextElm.outerHTML = ''
            this.renderEmbed(url, elm)
          })
        })
      },
      detectEmbed(e) {
        if (e.keyCode === 13 && this.embedElm) {
          const url = this.embedElm.innerHTML.replace("<br>", "")
          this.renderEmbed(url, this.embedElm)
          this.embedElm = null
          this.insert.isShow = false
        }
      },
      renderEmbed(url, elm) {
        let path = this.parseURL(url).path.split('/')
        let bliVid=path[2]
        let embedUrlParam
        if(bliVid.startsWith('BV')||bliVid.startsWith('bv')){
          embedUrlParam=`bvid=${bliVid}`
        }
        if(bliVid.startsWith('AV')||bliVid.startsWith('av')){
          embedUrlParam=`aid=${bliVid.substring(2,bliVid.length)}`
        }
        elm.innerHTML = `
            <iframe data-role="iframe"
                         frameborder="0"
                         allowfullscreen="true"
                         style="height: 500px; transition: all 0.3s linear"
                         src="https://player.bilibili.com/player.html?${embedUrlParam}">
            </iframe>
            `
      },
      parseURL(url) {
        var a = document.createElement('a');
        a.href = url;
        // var a = new URL(url);
        return {
          source: url,
          protocol: a.protocol.replace(':', ''),
          host: a.hostname,
          port: a.port,
          query: a.search,
          params: (function() {
            var params = {},
                seg = a.search.replace(/^\?/, '').split('&'),
                len = seg.length,
                p;
            for (var i = 0; i < len; i++) {
              if (seg[i]) {
                p = seg[i].split('=');
                params[p[0]] = p[1];
              }
            }
            return params;
          })(),
          hash: a.hash.replace('#', ''),
          path: a.pathname.replace(/^([^\/])/, '/$1')
        }
      },
      addEmbed() {
        if (this.insert.isToggle) {
          this.editor.pasteHTML(`<p class="guten-bilibili-embed"><br></p>`, {cleanAttrs: [], cleanTags: [], unwrapTags: []})
          this.embedElm = this.editor.getSelectedParentElement()
          this.insert.isToggle = false
          this.insert.isShow = false
        }
      }
    },
    destroyed() {
      this.unsubscribe()
    },
    beforeMount() {
      this.window = window;
      window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }
</script>