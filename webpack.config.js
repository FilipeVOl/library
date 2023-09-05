const path = require('path');

module.exports = {
  entry: './src/index.js', // Arquivo de entrada
  output: {
    filename: 'main.js', // Nome do arquivo de saída
    path: path.resolve(__dirname, 'dist'), // Diretório de saída
  },
  devtool: 'source-map',
  module: {
    rules: [
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        },
    ],
  },
};
