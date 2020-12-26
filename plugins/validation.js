import { extend, localize } from 'vee-validate'
import { required, min, max } from 'vee-validate/dist/rules'
import en from 'vee-validate/dist/locale/en.json'

export default () => {
  extend('required', required)
  extend('min', min)
  extend('max', max)

  localize('en', en)
}
