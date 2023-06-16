import {defineConfig} from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        watch: false,
        threads: false,
        reporters: 'verbose',
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html', 'lcov'],
        },
    },
});
