const path = require('path');
const { globSync } = require('glob');

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

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
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
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
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: './examples/**/public/*',
                    to: ({ absoluteFilename }) => {
                        const [_, exampleName, file] = absoluteFilename
                            .match(/\/examples\/([^\/]+)\/public\/(.+)$/) || [];

                        console.log(absoluteFilename);

                        if (!exampleName) {
                            return absoluteFilename;
                        }

                        console.log(exampleName, file, path.resolve(__dirname, `dist/public/${exampleName}/${file}`))

                        return path.resolve(__dirname, `dist/public/${exampleName}/${file}`);
                    },
                }
            ],
        })
    ]
};
