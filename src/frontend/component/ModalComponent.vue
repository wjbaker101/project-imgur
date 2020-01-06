<template>
    <div class="modal-component"
            :class="{ 'is-visible': isVisible }"
            @click.self="onHideModal(modalID)">
        <div class="modal-content">
            <div class="close-modal" @click="onHideModal(modalID)">
                <CloseIcon />
            </div>
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    import { EventService, Events } from '@frontend/service/EventService';

    import CloseIcon from '@frontend/assets/icon/times.svg';

    export default Vue.extend({
        name: 'ModalComponent',

        props: {
            modalID: {
                type: String,
                required: true,
            },
        },

        components: {
            CloseIcon,
        },

        data() {
            return {
                isVisible: false,
            }
        },

        mounted(): void {
            EventService.$on(Events.EVENT_SHOW_MODAL, this.onShowModal);
            EventService.$on(Events.EVENT_HIDE_MODAL, this.onHideModal);
        },

        destroyed(): void {
            EventService.$off(Events.EVENT_SHOW_MODAL, this.onShowModal);
            EventService.$off(Events.EVENT_HIDE_MODAL, this.onHideModal);
        },

        methods: {
            onShowModal(modalID: string): void {
                if (this.modalID === modalID) {
                    this.isVisible = true;
                }
            },

            onHideModal(modalID: string): void {
                if (this.modalID === modalID) {
                    this.isVisible = false;
                }
            },
        },
    })
</script>

<style lang="scss">
    .modal-component {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        padding: 1rem;
        background-color: rgba(0, 0, 0, 0.8);
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.2s;

        &.is-visible {
            opacity: 1;
            pointer-events: all;

            .modal-content {
                transform: translateY(0);
            }
        }

        .modal-content {
            width: 100%;
            height: 100%;
            border: 4px double theme(bg-dark);
            background-color: theme(bg);
            transform: translateY(2rem);
            transition: transform 0.5s;
        }

        .close-modal {
            padding: 1rem;
            position: absolute;
            top: 0;
            right: 0;
            cursor: pointer;
            opacity: 0.2;

            &:hover {
                opacity: 1;
            }
        }
    }
</style>