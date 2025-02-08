const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { hashElement } = require('folder-hash');
const MergeJsonWebpackPlugin = require('merge-jsons-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const WebpackNotifierPlugin = require('webpack-notifier');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const environment = require('./environment');
const proxyConfig = require('./proxy.conf');

module.exports = async (config, options, targetOptions) => {
  const languagesHash = await hashElement(path.resolve(__dirname, '../src/main/webapp/i18n'), {
    algo: 'md5',
    encoding: 'hex',
    files: { include: ['*.json'] },
  });

  // PLUGINS
  if (config.mode === 'development') {
    config.plugins.push(
      new WebpackNotifierPlugin({
        title: 'New Project',
        contentImage: path.join(__dirname, 'logo-jhipster.png'),
      }),
    );
  }

  // configuring proxy for back end service
  const tls = config.devServer?.server?.type === 'https';
  if (config.devServer) {
    config.devServer.proxy = proxyConfig({ tls });
  }

  if (targetOptions.target === 'serve' || config.watch) {
    config.plugins.push(
      new BrowserSyncPlugin(
        {
          host: 'localhost',
          port: 9000,
          https: tls,
          proxy: {
            target: `http${tls ? 's' : ''}://localhost:${targetOptions.target === 'serve' ? '4200' : '8080'}`,
            ws: true,
            proxyOptions: {
              changeOrigin: false,
            },
            proxyReq: [
              function (proxyReq) {
                proxyReq.setHeader('X-Forwarded-Host', 'localhost:9000');
                proxyReq.setHeader('X-Forwarded-Proto', 'https');
              },
            ],
          },
          socket: {
            clients: {
              heartbeatTimeout: 60000,
            },
          },
        },
        {
          reload: targetOptions.target === 'build',
        },
      ),
    );
  }

  if (config.mode === 'production') {
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        reportFilename: '../../stats.html',
      }),
    );
  }

  const patterns = [
    {
      context: require('swagger-ui-dist').getAbsoluteFSPath(),
      from: '*.{js,css,html,png}',
      to: 'swagger-ui/',
      globOptions: { ignore: ['**/index.html'] },
    },
    {
      from: path.join(path.dirname(require.resolve('axios/package.json')), 'dist/axios.min.js'),
      to: 'swagger-ui/',
    },
    { from: './src/main/webapp/swagger-ui/', to: 'swagger-ui/' },
  ];

  if (patterns.length > 0) {
    config.plugins.push(new CopyWebpackPlugin({ patterns }));
  }

  config.plugins.push(
    new webpack.DefinePlugin({
      I18N_HASH: JSON.stringify(languagesHash.hash),
      __VERSION__: JSON.stringify(environment.__VERSION__),
      SERVER_API_URL: JSON.stringify(environment.SERVER_API_URL),
    }),
    new MergeJsonWebpackPlugin({
      output: {
        groupBy: [
          { pattern: './src/main/webapp/i18n/es/*.json', fileName: './i18n/es.json' },
          { pattern: './src/main/webapp/i18n/ca/*.json', fileName: './i18n/ca.json' },
          { pattern: './src/main/webapp/i18n/en/*.json', fileName: './i18n/en.json' },
          { pattern: './src/main/webapp/i18n/gl/*.json', fileName: './i18n/gl.json' },
          { pattern: './src/main/webapp/i18n/pt-pt/*.json', fileName: './i18n/pt-pt.json' },
        ],
      },
    }),
  );

  config = merge(
    config,
  );

  return config;
};
