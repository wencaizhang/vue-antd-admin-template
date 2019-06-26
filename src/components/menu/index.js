import Menu from 'ant-design-vue/es/menu'
import Icon from 'ant-design-vue/es/icon'
import store from '@/store'

const { Item, SubMenu } = Menu

export default {
  name: 'SMenu',
  props: {
    menu: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: false,
      default: 'light'
    },
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data() {
    return {
      openKeys: [],
      selectedKeys: [],
      cachedOpenKeys: []
    }
  },

  computed: {
    rootSubmenuKeys (vm) {
      let keys = []
      vm.menu.forEach(item => keys.push(item.path))
      return keys
    },
    role () {
      return store.state.app.role;
    }
  },

  created() {
    this.updateMenu()
  },

  watch: {
    collapsed(val) {
      if (val) {
        this.cachedOpenKeys = this.openKeys
        this.openKeys = []
      } else {
        this.openKeys = this.cachedOpenKeys
      }
    },
    '$route'() {
      this.updateMenu()
    }
  },
  methods: {

    // filterMenuData (data) {
    //   return data.filter(item => {
    //     let bool = !item.hidden && item.meta.role.includes(this.role);
    //     item.children =
    //       bool && item.children && item.children.length
    //       ? this.filterMenuData(item.children)
    //       : null;
    //     return bool;
    //   })
    // },
    renderMenu(h, menuData) {
      console.count('renderMenu'); // 无限次触发 renderMenu
      this.filterMenuData(menuData)

      return menuData.map((menu, i) => this.renderItem(h, menu, '0', i))
    },
    
    filterMenuData (data=this.menu) {
      // 将 hidden: true 的过滤掉，不展示在 sidebar 中
      data.forEach(item => {
        if (item.children) {
          const filter = item.children.filter(i => !i.hidden)
          if (filter.length == 0) {
            item.children = null
          } else {
            this.filterMenuData(item.children);
          }
        }
      });
    },
    getKey (menu, pIndex, index) {
      return menu.name ? menu.name : 'item_' + pIndex + '_' + index
    },
    renderIcon(h, icon) {
      return icon === 'none' || icon == null
        ? null
        : <Icon type={icon}/>
    },
    renderMenuItem(h, menu, pIndex, index) {
      return (
        <Item key={this.getKey (menu, pIndex, index)}>
          <router-link to={{ name: menu.name }}>
            {this.renderIcon(h, menu.meta.icon)}
            <span>{menu.meta.title}</span>
          </router-link>
        </Item>
      )
    },
    renderSubMenu(h, menu, pIndex, index) {
      let pIndex_ = pIndex + '_' + index
      let subItem = [
        <span slot="title">
          {this.renderIcon(h, menu.meta.icon)}
          <span>{menu.meta.title}</span>
        </span>
      ]
      let itemArr = menu.children
        .filter(menu => !menu.alwaysShow)
        .map((item, i) => this.renderItem(h, item, pIndex_, i))

      return (
        <SubMenu key={this.getKey(menu, pIndex, index)}>
          { subItem.concat(itemArr) }
        </SubMenu>
      )
    },
    renderItem(h, menu, pIndex, index) {
      if (menu.hidden) return;
      return menu.children && !menu.alwaysShow
        ? this.renderSubMenu(h, menu, pIndex, index)
        : this.renderMenuItem(h, menu, pIndex, index)
    },
    onOpenChange (openKeys) {
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    },
    onSelect (obj) {
      this.selectedKeys = obj.selectedKeys
      this.$emit('select', obj)
    },
    updateMenu () {
      // 设置菜单展开项和高亮项
      let routes = this.$route.matched.concat()
      if (routes.length >= 4 && this.$route.meta.hidden) {
        routes.pop()
        this.selectedKeys = [routes[2].name]
      } else {
        this.selectedKeys = [routes.pop().name]
      }

      let openKeys = []
      if (this.mode === 'inline') {
        routes.forEach((item) => {
          openKeys.push(item.name)
        })
      }

      this.collapsed ? this.cachedOpenKeys = openKeys : this.openKeys = openKeys
    }
  },
  render (h) {
    const props = {
      theme: this.$props.theme,
      mode: this.$props.mode,
      openKeys: this.openKeys,
      selectedKeys: this.selectedKeys
    }
    return (
      <Menu
        props={props}
        onOpenChange={this.onOpenChange}
        onSelect={this.onSelect}
      >
        { this.renderMenu(h, this.menu) }
      </Menu>
    )
  }
}
