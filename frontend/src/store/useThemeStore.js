import { create } from 'zustand';

const useThemeStore = create((set) => ({
    theme: localStorage.getItem('streamify-theme') || 'dracula',
    setTheme: (theme) => {
        localStorage.setItem('streamify-theme', theme);
        set({ theme });
    },
}));

export default useThemeStore;