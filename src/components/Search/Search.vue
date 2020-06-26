<template>
  <form action="#" aria-label="搜索 Guten" role="search" class="">
    <div class="main-layout gu-flex-shrink">
      <div class="aside-search-body">
        <div class="main-layout flex-row">
          <div class="main-layout display-flex justify-center">
            <svg-icon iconClass="search" class="search-icon" style="font-size:20px"></svg-icon>
          </div>
          <div dir="auto" class="aside-search-input">
            <input class="dropdown-input input-style"
                   autocapitalize="sentences"
                   autocomplete="off"
                   autocorrect="off"
                   type="text"
                   dir="auto"
                   data-focusable="true"
                   :name="name"
                   @focus="showOptions()"
                   @blur="exit()"
                   @keyup="keyMonitor"
                   v-model="searchFilter"
                   :disabled="disabled"
                   :placeholder="placeholder"/>
          </div>
        </div>
      </div>
    </div>
    <!-- Dropdown Menu  v-if="optionsShown"  -->
    <div class="main-layout search-content"
         v-if="optionsShown"
    >
      <div class="search-item"
           @mousedown="selectOption(option)"
           v-for="(option, index) in filteredOptions"
           :key="index">
        {{ option.name || option.id || '-' }}
      </div>
    </div>
  </form>
</template>

<script>
  export default {
    name: 'Search',
    props: {
      name: {
        type: String,
        required: false,
        default: 'dropdown',
        note: 'Input name'
      },
      options: {
        type: Array,
        required: true,
        default: [],
        note: 'Options of dropdown. An array of options with id and name',
      },
      placeholder: {
        type: String,
        required: false,
        default: '搜索 Guten',
        note: 'Placeholder of dropdown'
      },
      disabled: {
        type: Boolean,
        required: false,
        default: false,
        note: 'Disable the dropdown'
      },
      maxItem: {
        type: Number,
        required: false,
        default: 6,
        note: 'Max items showing'
      }
    },
    data() {
      return {
        selected: {},
        optionsShown: false,
        searchFilter: ''
      }
    },
    created() {
      this.$emit('selected', this.selected);
    },
    computed: {
      filteredOptions() {
        const filtered = [];
        const regOption = new RegExp(this.searchFilter, 'ig');
        for (const option of this.options) {
          if (this.searchFilter.length < 1 || option.name.match(regOption)) {
            if (filtered.length < this.maxItem) filtered.push(option);
          }
        }
        return filtered;
      }
    },
    methods: {
      selectOption(option) {
        this.selected = option;
        this.optionsShown = false;
        this.searchFilter = this.selected.name;
        this.$emit('selected', this.selected);
      },
      showOptions() {
        if (!this.disabled) {
          this.searchFilter = '';
          this.optionsShown = true;
        }
      },
      exit() {
        if (!this.selected.id) {
          this.selected = {};
          this.searchFilter = '';
        } else {
          this.searchFilter = this.selected.name;
        }
        this.$emit('selected', this.selected);
        this.optionsShown = false;
      },
      // Selecting when pressing Enter
      keyMonitor: function (event) {
        if (event.key === "Enter" && this.filteredOptions[0])
          this.selectOption(this.filteredOptions[0]);
      }
    },
    watch: {
      searchFilter() {
        if (this.filteredOptions.length === 0) {
          this.selected = {};
        } else {
          this.selected = this.filteredOptions[0];
        }
        this.$emit('filter', this.searchFilter);
      }
    }
  };
</script>

<style lang="less" scoped>
  .aside-search-body {
    background-color: rgb(230, 236, 240);
    border-bottom: 1px solid rgba(0, 0, 0, 0);;
    border-radius: 9999px;
    font-size: 15px;

    .search-icon {
      padding-left: 10px;
      min-width: 30px;
      margin-right: 8px;
      vertical-align: text-bottom;
      position: relative;
      height: 2.25rem;
    }

    .aside-search-input {
      font-size: 15px;
      font-weight: 400;
      line-height: 2.25rem;
      border: 0 solid black;
      box-sizing: border-box;
      color: rgba(0, 0, 0, 1.00);
      display: inline;
      width: 100%;
      white-space: pre-wrap;
      word-wrap: break-word;
    }

    .input-style {
      outline-style: none;
      text-align: inherit;
      font-size: inherit;
      font-family: inherit;
      background-color: rgba(0, 0, 0, 0);
      width: 100%;
      border: 0px;
    }
  }

  .search-content {
    position: absolute;
    background-color: #fff;
    right: 0px;
    left: 0px;
    overflow-y: auto;
    min-height: 100px;
    max-height: calc(80vh - 53px);
    z-index: 1;
    border-radius: 5px;
    box-shadow: rgba(101, 119, 134, 0.2) 0px 0px 15px, rgba(101, 119, 134, 0.15) 0px 0px 3px 1px;

    .search-item {
      color: black;
      font-size: .7em;
      line-height: 1em;
      padding: 8px;
      text-decoration: none;
      display: block;
      cursor: pointer;
      &:hover {
        background-color: rgb(245, 248, 250);
      }
    }
  }
</style>