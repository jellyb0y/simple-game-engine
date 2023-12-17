const path = require('path');
const { globSync } = require('glob');

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const tsConfigPath = path.resolve(__dirname, './tsconfig.json');

const examplesEntries = globSync('examples/*/index.ts').reduce((acc, entry) => {
    const exampleName = entry.match(/^examples\/(.+)\/index\.ts/)?.[1];

    if (!exampleName) {
        return acc;
    }

    acc['example-' + exampleName] = path.resolve(__dirname, entry);

    return acc;
}, {});

module.exports = {
    resolve: {
        plugins: [
          new TsconfigPathsPlugin({
            configFile: tsConfigPath,
          }),
        ],
    },
    devtool: 'inline-source-map',
    entry: './lib/index.ts',
    entry: {
        ...examplesEntries,
    },
    mode: 'development',
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js']
    },
};
