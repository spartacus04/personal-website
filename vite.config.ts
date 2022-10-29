import { defineConfig } from "vite"
import { resolve } from "path"

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                it: resolve(__dirname, "italian.html"),
                err: resolve(__dirname, "404.html"),
            }
        },
        cssTarget: "chrome61"
    },
})