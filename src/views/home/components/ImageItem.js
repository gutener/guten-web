export const ImageList = {
  name: 'image-list',
  props: {
    itemList: {
      type: Array
    }
  },
  render() {

  }
}
export const ImageItem = {
  name: 'image-item',
  props: ['style', 'src'],
  render() {
    return (
        <div aria-label="Media" role="group"
             class="main-layout flex-grow1 image-group">
          <div class="image-style" style={style}/>
          <div aria-label="Remove media" role="button" class=""/>
          <div aria-label="Edit media" role="button" class=""/>
        </div>
    );
  }
}