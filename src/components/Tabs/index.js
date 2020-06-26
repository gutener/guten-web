export const Tabs = {
  name: "tabs",

  render() {
    const tabs = this.$slots.default.filter(
        component => component.componentOptions
    );

    const tabList = [];
    tabs.forEach((child, index) => {
      const {title, url, titleSlot, active} = child.componentOptions.propsData;
      const content = titleSlot ? this.$slots[titleSlot] : title;
      const isDisabled = active==='' || false;
      tabList.push(
          <div class="main-layout flex-grow1">
            <router-link
                class="flex-column justify-center gu-flexCenter"
                role="tab"
                to={url}
                aria-selected={this.selectedIndex === index ? "true" : "false"}
                aria-disabled={isDisabled ? "true" : "false"}
            >
              {content}
            </router-link>
          </div>
      );
    });

    return (
        <div class="main-layout" role="tabs">
          <nav class="main-layout gu-flex-shrink flex-row flex-grow1" role="tablist">
            {this.$slots.left}
            {tabList}
            {this.$slots.right}
          </nav>
        </div>
    );
  }
};

export const Tab = {
  name: 'tab',
  props: ['title', 'url', 'titleSlot','active','disabled'],
  render() {
    return (
        <div class="" role="tabpanel">
          {this.$slots.default}
        </div>
    );
  }
};

export function install(Vue) {
  Vue.component(Tabs.name, Tabs);
  Vue.component(Tab.name, Tab);
}
