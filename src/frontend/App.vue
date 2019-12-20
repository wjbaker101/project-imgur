<template>
    <div class="app-view">
        <nav>
            <div class="brand">
                <strong>
                    Imgur<br>
                    Uploader
                </strong>
            </div>
            <router-link to="/">
                <AllAlbumsIcon /><br>
                <span>All Albums</span>
            </router-link>
            <router-link to="/new-album">
                <PlusIcon /><br>
                <span>New Album</span>
            </router-link>
            <a href="https://api.imgur.com/oauth2/authorize?client_id=b400fc81cf0c9b3&response_type=token">
                <UserIcon /><br>
                <span>Login</span>
            </a>
        </nav>
        <router-view />
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    import AllAlbumsIcon from '@frontend/assets/icon/ellipsis.svg';
    import PlusIcon from '@frontend/assets/icon/plus.svg';
    import PencilIcon from '@frontend/assets/icon/pencil.svg';
    import UserIcon from '@frontend/assets/icon/user.svg';

    export default Vue.extend({
        name: 'App',

        components: {
            AllAlbumsIcon,
            PlusIcon,
            PencilIcon,
            UserIcon,
        },
    })
</script>

<style lang="scss">
    @import '@frontend/style/webstyle.scss';

    .app-view {
        height: 100%;
        display: flex;

        & > * {
            flex: 1;
            height: 100%;
        }

        nav {
            padding: 0.5rem;
            display: flex;
            flex: 0 0 auto;
            flex-direction: column;
            font-size: 0.8em;
            text-align: center;
            text-transform: uppercase;
            border-right: 4px double theme(bg-light);
            background-color: theme(bg-dark);

            .brand {
                margin-bottom: 2rem;
            }

            a {
                &:hover {
                    color: theme(primary);
                }

                & + a {
                    margin-top: 1rem;
                }
            }
        }
    }
</style>
