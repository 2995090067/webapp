<style scoped>
</style>

<template>
    <form>
        <img id="preview" src="{{file && URL.createObjectURL(file)}}">
        <input type="file" name="photo" v-on="change: previewFile">
        <input type="submit" value="提交" v-on="click: submitFile">
    </form>
</template>

<script>

export default {
    data () {
        return {
            $file: null,
            file: null
        }
    },
    mounted () {
        this.$file = this.$el.querySelector('input[type="file"]');
    },
    methods: {
        preview (e) {
            let file = e.target.files[0];
            let supportedTypes = ['image/jpg', 'image/jpeg', 'image/png'];
            if (file && supportedTypes.indexOf(file.type) >= 0) {
                this.file = file;
            } else {
                alert('文件格式只支持：jpg、jpeg 和 png');
                this.clearFile();
            }
        },
        clearFile () {
            this.$file.value = '';
            this.file = null;
        },
        submitFile (e) {
            let self = this;
            if (this.file) {
                // use async save function
                saveFile(this.file, () => {
                    self.clearFile()
                });
                e.preventDefault();
            }
        }
    }
}

</script>
