const config = {
  lint: {
    paths: ['src', 'test', 'docs'],
    extensions: ['js', 'md']
  },

  alias: {},

  entry: {
    test: 'test/node.js',
    size: 'test/size.js',
    bench: 'test/bench/index.js'
  }
};

module.exports = config;
