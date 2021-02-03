<template>
  <div class="editor">
    <div id="editor">
    </div>
  </div>
</template>

<script>
  import E from 'wangeditor'
  import {Message} from "element-ui";
  export default {
    name: "EditorItem",
    data() {
      return {
        editor: null,
        editorData: '',
        isUpdate: false,
      }
    },
    props: {
      placeholder: String,
    },
    watch: {

    },
    mounted() {
      this.setEditor();

    },
    methods: {
      setEditor() {
        this.editor = new E('#editor');
        this.editor.config.placeholder = this.placeholder;
        this.editor.config.uploadImgServer = `${process.env.BASE_API}/uploadEdit`;
        this.editor.config.uploadFileName = 'upload';
        this.editor.config.uploadImgTimeout = 30 * 1000;
        this.editor.config.uploadImgHooks = {
          customInsert(insertImgFn, result){
            if(result.errno == 0) {
              result.data.forEach((item) =>{
                insertImgFn(`${process.env.BASE_API}${item}`)
              })
            } else {
              Message({
                message: '上传图片出错',
                type: 'error',
                duration: 5 * 1000
              });
            }
          }
        };
        this.editor.config.onchange = (newHtml) => {
          if(this.isUpdate) {
            this.editorData = newHtml
            this.$emit('change', this.editorData)
          }
        };
        this.editor.create()
      },

      update(content){
        if(content)
          this.editor.txt.html(content);
        setTimeout( () =>this.isUpdate = true, 100)
      }

    },
    beforeDestroy() {
      this.editor.destroy()
      this.editor = null
    }
  }
</script>

<style scoped>
  .editor {
    width: 100%;
    margin: 0 auto;
    position: relative;
    z-index: 0;
    text-align: left
  }
</style>
