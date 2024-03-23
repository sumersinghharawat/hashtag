import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import inject from "@rollup/plugin-inject";

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
        inject({
                 $: 'jquery',
                 jQuery: 'jquery',
        })
    ],
});
