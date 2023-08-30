import { App } from 'vue';
import vueDragScale from './components/index.vue';

const components = [vueDragScale];
const install = (app: App) => {
    components.map(item => {
      app.component(item.name, item)
    })
}
//实现按需引入
export { vueDragScale } 

export default install // 批量的引入