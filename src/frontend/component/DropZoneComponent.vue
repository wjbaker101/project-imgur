<template>
    <div class="drop-zone-component" :class="{ 'is-drag': isDragOver }">
        <slot />
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        name: 'DropZoneComponent',

        data() {
            return {
                isDragOver: false,
            }
        },

        mounted() {
            this.$el.addEventListener('dragover', this.onDragOver);
            this.$el.addEventListener('dragenter', this.onDragEnter);
            this.$el.addEventListener('dragexit', this.onDragExit);
            this.$el.addEventListener('drop', this.onDrop);
        },

        destroyed() {
            this.$el.removeEventListener('dragover', this.onDragOver);
            this.$el.removeEventListener('dragenter', this.onDragEnter);
            this.$el.removeEventListener('dragexit', this.onDragExit);
            this.$el.removeEventListener('drop', this.onDrop);
        },

        methods: {
            onDragOver(event: DragEvent): void {
                event.preventDefault();
            },

            onDragEnter(): void {
                this.isDragOver = true;
            },

            onDragExit(): void {
                this.isDragOver = false;
            },

            onDrop(event: DragEvent): void {
                if (!event.dataTransfer) {
                    return;
                }

                this.isDragOver = false;

                this.$emit('drop', event.dataTransfer.getData('text/plain'));

                event.preventDefault();
            },
        },
    })
</script>

<style lang="scss">
</style>