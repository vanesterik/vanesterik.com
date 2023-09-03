module.exports = {
  '**/*.js': ['prettier --write'],
  '**/*.json': ['prettier --write'],
  '**/*.md': ['prettier --write'],
  '**/!(.ladle)/*.ts{,x}': [
    'eslint --fix --max-warnings 0',
    'prettier --config ./.prettierrc.js --write',
  ],
  '**/*.y{,a}ml': ['prettier --write'],
}
