import prompt from '../config/plop/index.mjs'

export default function (plop) {
  plop.setGenerator('package', prompt)
}
