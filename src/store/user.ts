import { defineStore } from 'pinia';

enum UserRole {
    admin = 'admin',
};

type UserState = {
    username: string;
    role: UserRole | '';
    token: string;
    theme: string;
};

const initialState: UserState = {
    username: '',
    role: '',
    token: '',
    theme: '',
};

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        ...initialState,
    }),
    actions: {
        updateUser(data: { username: string; role: UserRole | '' }) {
            this.$state.username = data.username;
            this.$state.role = data.role;
        },
        updateTheme(theme: string) {
            this.$state.theme = theme
        },
        updateToken(token: string) {
            this.$state.token = token;
        }
    }
});
