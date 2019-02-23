<template>
  <div>
    <div v-if="searchOptions">
      <a-select
        showSearch
        @search="searchChange"
        @change="handleChange"
        :value="stateValue"
        :defaultActiveFirstOption="false"
        :showArrow="false"
        :filterOption="false"
      >
        <a-spin v-if="fetching" slot="notFoundContent" size="small"/>
        <a-select-option
          v-for="d in searchOptions"
          :key="d.property"
          :value="d.property"
        >{{d.value}}</a-select-option>
      </a-select>
    </div>
  </div>
</template>
<script>
import { myAxios, replaceQuery, sortUtils, fromPromiseToOb } from "@/utils";
import { Subscription, Subject, of, Observable } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  tap,
  switchMap,
  map,
  mergeMap
} from "rxjs/operators";
import commonService from "@/shared/services/common.service";

export default {
  data() {
    this.emiting = false;
    this.commonSer = commonService.getInstance();
    this.searchTerms = new Subject();
    return {
      stateValue: "",
      searchOptions: [],
      fetching: false
    };
  },
  props: [
    "miDisabled",
    "miPlaceHolder",
    "value",
    "miPickerFormat",
    "miSearchFilter"
  ],
  components: {},
  beforeMount() {
    const that = this;
    this.mySub = this.searchTerms
      .asObservable()
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(_ => (this.fetching = true)),
        switchMap(term => {
          const query = encodeURI(term);
          return fromPromiseToOb(() => this.commonSer.getColleague(term));
        }),
        mergeMap(_ => {
          return this.doFilter(_);
        })
      )
      .subscribe(
        data => {
          that.orignalData = data;
          that.fetching = false;
          const alter = data.map(c => ({
            value: c.EMPNO + "," + c.NICK_NAME + "," + c.USER_NAME,
            property: c.EMPNO
          }));
          this.searchOptions = alter;
        },
        err => {
          this.commonSer.errDeal(err);
          this.fetching = false;
        }
      );
  },
  mounted() {
    var _$props = this.$props,
      value = _$props.value;
    this.updateSearch(value);
  },
  destroyed() {
    this.mySub && this.mySub.unsubscribe();
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  watch: {
    value: function value(value) {
      if (this.emiting) {
        this.emiting = false;
      } else {
        this.updateSearch(value);
      }
    }
  },
  methods: {
    updateSearch(value) {
      const that = this;
      if (value) {
        value = value + "";
        that.commonSer
          .getColleague(value)
          .then(_ => that.doFilter(_, false))
          .then(
            data => {
              that.orignalData = data;
              if (data.length > 0) {
                const val = data.find(
                  d =>
                    d.EMPNO === value ||
                    d.NICK_NAME === value ||
                    d.USER_NAME === value
                );
                if (val) {
                  const alter = [val].map(c => ({
                    value: c.EMPNO + "," + c.NICK_NAME + "," + c.USER_NAME,
                    property: c.EMPNO
                  }));
                  that.searchOptions = alter;
                  that.stateValue = alter[0].property;
                  that.emitColleagueOut(val);
                }
              } else {
                that.propagateChange("");
              }
            },
            err => {
              that.commonSer.errDeal(err);
              that.propagateChange("");
            }
          );
      } else {
        that.propagateChange("");
      }
    },
    searchChange(searchText) {
      this.searchTerms.next(searchText);
    },
    propagateChange(v) {
      this.emiting = true;
      this.$emit("change", v);
    },
    emitColleagueOut(val) {
      let out = val.EMPNO;
      const miPickerFormat = this.miPickerFormat;
      if (typeof miPickerFormat === "string" && miPickerFormat) {
        const p = replaceQuery(miPickerFormat, val);
        if (p) {
          out = p;
        }
      }
      this.propagateChange(out);
    },
    handleChange(v) {
      this.stateValue = v;
      const tar = this.orignalData.find(_ => _.EMPNO === v);
      this.emitColleagueOut(tar);
    },
    doFilter(_, toOb = true) {
      if (typeof this.miSearchFilter === "function") {
        const res = this.miSearchFilter(_);
        if (!toOb) {
          return res;
        }
        if (res instanceof Observable) {
          return res;
        } else {
          return of(res);
        }
      } else {
        if (!toOb) {
          return _;
        }
        return of(_);
      }
    }
  }
};
</script>

<style>
</style>
