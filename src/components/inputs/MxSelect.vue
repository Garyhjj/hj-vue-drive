<template>
  <div>
    <div>
      <a-select v-model="stateValue" @change="handleChange()" :allowClear="true">
        <a-select-option
          :value="item.property"
          v-for="item in options"
          :key="item.property"
        >{{item.value}}</a-select-option>
      </a-select>
    </div>
  </div>
</template>
<script>
import { myAxios, replaceQuery, sortUtils } from "@/utils";
import cacheService from "@/shared/services/cache.service";

export default {
  data() {
    this.cache = cacheService.getInstance();
    var _$props = this.$props,
      value = _$props.value;
    return {
      stateValue: value
    };
  },
  props: ["placeholder", "value", "lazyAPI", "options", "lazyParams"],
  components: {
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  watch: {
    value: function value(val) {
      this.stateValue = val;
    }
  },
  methods: {
    handleChange() {
      this.$emit("change", this.stateValue);
    },
    lazyLoad() {
      if (this.lazyAPI) {
        const lazyAPIUserMes = this.lazyAPIUserMes;
        if (typeof lazyAPIUserMes === "object") {
          const user = this.auth.user;
          // tslint:disable-next-line:forin
          for (let prop in lazyAPIUserMes) {
            const replaceMes = user[lazyAPIUserMes[prop]];
            this.lazyAPI = this.lazyAPI.replace(
              `{${prop}}`,
              replaceMes ? replaceMes : ""
            );
          }
        }
        const cacheName = "mxSelectLazy";
        let cache = this.cache.get(cacheName, this.lazyAPI, false);
        if (!cache) {
          cache = myAxios.get(replaceQuery(this.lazyAPI, {}, this.user));
          this.cache.update(cacheName, this.lazyAPI, cache, 2 * 1000);
        }
        cache.then(r => {
          if (isArray(r)) {
            const options = r
              .filter(f => f)
              .map(d => {
                if (isArray(d)) {
                  if (d.length === 1) {
                    return { property: d[0], value: d[0] };
                  } else if (d.length > 1) {
                    return { property: d[0], value: d[1] };
                  }
                } else if (typeof d === "object") {
                  const params = this.lazyParams;
                  const keys =
                    isArray(params) && params.length > 0
                      ? params
                      : Object.keys(d);
                  if (keys.length === 1) {
                    return { property: d[keys[0]], value: d[keys[0]] };
                  } else if (keys.length > 1) {
                    return { property: d[keys[0]], value: d[keys[1]] };
                  }
                }
              })
              .sort((a, b) => sortUtils.byCharCode(a.value, b.value));
            this._options.length = 0;
            this._options.push(...options);
          }
        });
      }
    }
  }
};
</script>

<style>
</style>
