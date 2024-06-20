import {
    create,
    NForm, 
    NFormItem, 
    NInput, 
    NButton, 
    NCard,
    NLayout,
    NH1,
    NIcon,
    NSelect,
    NSwitch,
    NInputNumber
  } from 'naive-ui'

  const components = create({
    components: [NButton, NForm, NCard, NInput, NFormItem, NLayout, NH1, NIcon, NSelect, NSwitch, NInputNumber]
  })

  export default components