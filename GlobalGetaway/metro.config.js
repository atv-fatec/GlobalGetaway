/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

/* module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
 */

const path = require('path');

module.exports = {
    transformer: {
        getTransformOptions: async () => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: true,
            },
        }),
    },
    resolver: {
        /* Adicione aqui os caminhos para as pastas que deseja incluir */
        extraNodeModules: {
            '@components': path.resolve(__dirname, 'src/app/components'),
            '@pages': path.resolve(__dirname, 'src/app/pages'),
            '@routes': path.resolve(__dirname, 'src/app/routes'),
            '@styles': path.resolve(__dirname, 'src/app/styles'),
        },
    },
    watchFolders: [
        /* Adicione aqui os caminhos para as pastas que deseja incluir */
        path.resolve(__dirname, 'src/app/components'),
        path.resolve(__dirname, 'src/app/pages'),
        path.resolve(__dirname, 'src/app/routes'),
        path.resolve(__dirname, 'src/app/styles'),
    ],
};
