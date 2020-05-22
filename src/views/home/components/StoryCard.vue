<template>
  <div class="Feed">
    <div class="ContentItem ArticleItem">
      <h2 class="ContentItem-title">
        <a href="/stories/{id}" target="_blank">{{title}}</a>
      </h2>
      <div class="RichContent is-collapsed">
        <div class="RichContent-cover">
          <div class="RichContent-cover-inner"><img
                  src="https://pic3.zhimg.com/50/v2-e9db02ae7bf8462c1d3ed25f41fe0a67_400x224.jpg" alt="cover">
          </div>
        </div>
        <div class="RichContent-inner">
            <span class="RichText ztext CopyrightRichText-richText" temprop="articleBody">
              <div class="simple markdown-body" v-html="body"></div>
            </span>
          <a class="Button ContentItem-more Button--plain">阅读全文</a>
        </div>
        <div class="ContentItem-actions">
          <button type="button"
                  class="Button ContentItem-action Button--plain Button--withIcon Button--withLabel">
                    <span style="display: inline-flex; align-items: center;">
                      <svg-icon iconClass="reply" style="font-size: 20px;"></svg-icon>
                    </span>
            <span>305 条回复</span>
          </button>
          <button type="button" class="Button ContentItem-action Button--plain Button--withIcon Button--withLabel">
            <span style="display: inline-flex; align-items: center;"></span><span>收藏</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name:"hp-card",
    props: [
      'id',
      'title',
      'body'
    ]
  }
</script>