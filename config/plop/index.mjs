export default {
  description: '创建一个 Package',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: '请输入模块名称（Please enter module name）'
    }
  ],
  actions: (data) => {
    const { name } = data

    const actions = []
    if (name) {
      actions.push({
        type: 'add',
        path: `../packages/${name}/src/index.ts`,
        templateFile: '../config/plop/template/entry.hbs'
      }),
        actions.push({
          type: 'add',
          path: `../packages/${name}/package.json`,
          templateFile: '../config/plop/template/package.hbs',
          data: {
            name
          }
        }),
        actions.push({
          type: 'add',
          path: `../packages/${name}/src/__tests__/index.test.ts`,
          templateFile: '../config/plop/template/test.hbs'
        }),
        actions.push({
          type: 'add',
          path: `../packages/${name}/README.md`,
          templateFile: '../config/plop/template/readme.hbs',
          data: {
            name
          }
        })
    }

    return actions
  }
}
