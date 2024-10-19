module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    plugins: ['@typescript-eslint', 'react', 'react-hooks', 'prettier'],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended', // Integrates Prettier with ESLint
    ],
    rules: {
        'prettier/prettier': 'error', // Show Prettier issues as ESLint errors
        '@typescript-eslint/no-unused-vars': 'warn',
        'react/prop-types': 'off', // Not needed with TypeScript
        'react/react-in-jsx-scope': 'off', // Not needed with React 17+
    },
};
