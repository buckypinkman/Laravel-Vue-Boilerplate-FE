<template>
  <n-space vertical>
    <n-layout>
      <n-layout-header :inverted="inverted" bordered class="py-1 shadow">
        <div class="d-flex justify-content-between align-items-center px-1">
          <div class="col-md-6">
            <h3 class="d-flex align-items-center"><img src="../../assets/app-logo.jpg" class="mr-2" style="width: 50px" alt="app logo" />Yayasan Almuhajirin</h3>
          </div>
          <div class="col-md-6 d-flex justify-content-end align-items-center">
            <n-button class="me-3" @click="fullscreen">
              Fullscreen
            </n-button>
            <n-icon :component="themeIcon" @click="setTheme" size="25" class="me-3" style="cursor: pointer"></n-icon>
            <n-dropdown :options="options">
              <n-button>
                <div class="me-2">
                  {{ user.name }}
                </div>
                <n-badge :value="user.role" type="info">
                </n-badge>
              </n-button>
            </n-dropdown>
          </div>
        </div>
      </n-layout-header>
      <n-layout has-sider style="overflow-y: scroll; height: 100vh" embedded>
        <n-layout-sider
          bordered
          show-trigger
          collapse-mode="width"
          :collapsed-width="64"
          :width="240"
          :native-scrollbar="false"
          :inverted="inverted"
          class="shadow"
        >
          <n-menu
            :inverted="inverted"
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="menuOptions"
          />
        </n-layout-sider>
        <n-layout-content embedded>
          <div class="p-3">
            <slot></slot>
          </div>
        </n-layout-content>
      </n-layout>
    </n-layout>
  </n-space>
</template>
<style>
html {
  height: 100%;
}
body {
  min-height: 100%;
}

</style>
<script>
import { h, defineComponent, ref, computed } from "vue";
import { useStore } from 'vuex'
import {
  PersonOutline as PersonIcon,
  SearchOutline,
  SunnyOutline,
  MoonOutline,
  PersonCircleOutline as UserIcon,
  LogOutOutline as LogoutIcon,
  PieChart,
  ListOutline,
  HammerOutline,
  HomeOutline,
  NavigateOutline,
  PieChartOutline,
  LaptopOutline
} from "@vicons/ionicons5";
import { NIcon, NLayoutSider, NSpace, NMenu, NLayoutHeader, NLayoutContent, NDropdown, NBadge, useMessage } from "naive-ui";
import { RouterLink, useRouter } from "vue-router";
import axios from "axios";

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions = [
  {
    label: () => h(RouterLink, {
      to: {
        name: "home",
      }
    }, { default: () => "Home" }),
    key: "go-to-home",
    icon: renderIcon(ListOutline)
  },
  {
    label: () => h(RouterLink, {
      to: {
        name: "user",
      }
    }, { default: () => "User" }),
    key: "go-to-user",
    icon: renderIcon(PersonIcon)
  },
  {
    label: () => h(RouterLink, {
      to: {
        name: "pequrban",
      }
    }, { default: () => "Pequrban" }),
    key: "go-to-pequrban",
    icon: renderIcon(PersonIcon)
  },
  {
    label: () => h(RouterLink, {
      to: {
        name: "qurban-warehouse",
      }
    }, { default: () => "Gudang Bungkus" }),
    key: "go-to-qurban-warehouse",
    icon: renderIcon(HomeOutline)
  },
  {
    label: () => h(RouterLink, {
      to: {
        name: "distribusi",
      }
    }, { default: () => "Distribusi" }),
    key: "go-to-distribusi",
    icon: renderIcon(NavigateOutline)
  },
  {
    label: () => h(RouterLink, {
      to: {
        name: "monitoring",
      }
    }, { default: () => "Monitoring" }),
    key: "go-to-monitoring",
    icon: renderIcon(PieChartOutline)
  },
  {
    label: () => h(RouterLink, {
      to: {
        name: "app-setting",
      }
    }, { default: () => "App Settings" }),
    key: "go-to-app-setting",
    icon: renderIcon(HammerOutline)
  },
  // {
  //   label: "Nested",
  //   key: "Nested",
  //   icon: renderIcon(BookIcon),
  //   children: [
  //     {
  //       type: "group",
  //       label: "People",
  //       key: "people",
  //       children: [
  //         {
  //           label: "Narrator",
  //           key: "narrator",
  //           icon: renderIcon(PersonIcon)
  //         },
  //         {
  //           label: "Sheep Man",
  //           key: "sheep-man",
  //           icon: renderIcon(PersonIcon)
  //         }
  //       ]
  //     },
  //     {
  //       label: "The past increases. The future recedes.",
  //       key: "the-past-increases-the-future-recedes"
  //     }
  //   ]
  // }
];

export default defineComponent({
  components: {
    NLayoutSider,
    NSpace,
    NMenu,
    NLayoutHeader,
    NLayoutContent,
    NDropdown,
    NBadge
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const message = useMessage()
    const themeIcon = computed(() => {
      return  store.state.theme.theme ? SunnyOutline : MoonOutline
    })
    const setTheme = () => store.commit('theme/setTheme')

    const fullscreen = () => {
      var elem = document.getElementById("app");
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
      }
    }

    const logout = async () => {
      try {
        const res = await axios.get('/logout')
        if(res.data.success) {
          router.push({ name: 'login' })
          localStorage.removeItem('token')
          message.success('Success logout')
        }
      } catch (error) {
        console.log(error)
      }
    }

    const options= [
      {
        label: () => h(RouterLink, {
          to: {
            name: "profile",
            params: { id: '1' }
          }
        }, { default: () => "Profile" }),        
        key: "profile",
        icon: renderIcon(UserIcon)
      },
      {
        label: "Logout",
        key: "logout",
        icon: renderIcon(LogoutIcon),
        props: {
          onClick: logout
        }
      }
    ]

    const user = computed(() => {
      return store.getters['auth/user']
    })

    return {
      inverted: ref(false),
      menuOptions,
      SearchOutline,
      themeIcon,
      setTheme,
      options,
      user,
      PieChart,
      fullscreen
    };
  }
});
</script>