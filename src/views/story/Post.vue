<template>
  <main class="PostStory-main">
    <article class="PostStory-container">
      <header class="grid PostStory-header">Ask a public question</header>
      <div class="grid">
        <section class="PostStory-mainColumn">
          <div class="editable"></div>
        </section>
        <aside class="PostStory-SideBar">
          <div>
            <a-collapse v-model="activeKey">
              <a-collapse-panel key="1" header="This is panel header 1">
                <p>{{ text }}</p>
              </a-collapse-panel>
              <a-collapse-panel key="2" header="This is panel header 2" :disabled="false">
                <p>{{ text }}</p>
              </a-collapse-panel>
              <a-collapse-panel key="3" header="This is panel header 3" disabled>
                <p>{{ text }}</p>
              </a-collapse-panel>
            </a-collapse>
          </div>
        </aside>
      </div>
    </article>
  </main>
</template>

<script>
  export default {
    mounted() {
      this.render();
    },
    methods: {
      render() {
        var editor = new MediumEditor('.editable', {
          toolbar: {
            buttons: [
              'bold',
              'italic',
              {
                name: 'h1',
                action: 'append-h2',
                aria: 'header type 1',
                tagNames: ['h2'],
                contentDefault: '<b>H1</b>',
                classList: ['custom-class-h1'],
                attrs: {
                  'data-custom-attr': 'attr-value-h1'
                }
              },
              {
                name: 'h2',
                action: 'append-h3',
                aria: 'header type 2',
                tagNames: ['h3'],
                contentDefault: '<b>H2</b>',
                classList: ['custom-class-h2'],
                attrs: {
                  'data-custom-attr': 'attr-value-h2'
                }
              },
              'justifyCenter',
              'quote',
              'anchor'
            ]
          }
        });
      }
    }
  }
</script>

<style scoped>
  .PostStory-container {
    width: 100%;
    max-width: 1264px;
    background-color: transparent;
    border-left: 0;
    border-right: 0;
    padding: 0 16px;
    margin: 10px auto;
  }
  .grid{
    display: flex;
  }
  .PostStory-header{
    height: 130px;
  }
  .PostStory-mainColumn{
    -ms-flex-negative: 0;
    flex-shrink: 0;
    margin-right: 10px;
    margin-bottom: 0;
    width: 694px;
  }
  .PostStory-SideBar{
    -webkit-box-flex: 1;
    -ms-flex: 1 1;
    flex: 1 1;
    font-size: 14px
  }
  .editable {
    width: 100%;
    position: relative;
    flex-direction: column;
    justify-content: center;
    border: 1px solid grey;
    border-radius: 3px;
    height: 246px;
  }
</style>
