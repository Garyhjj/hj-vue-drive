<template>
  <div>
    <div v-if="searchOptions">
      <a-select showSearch @search="searchChange">
        <a-spin v-if="fetching" slot="notFoundContent" size="small"/>
        <a-select-option v-for="d in searchOptions" :key="d.value">{{d.value}}</a-select-option>
      </a-select>
    </div>
  </div>
</template>
<script>
import { Input } from "ant-design-vue";
import { myAxios, replaceQuery, sortUtils } from "@/utils";
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
    this.commonSer = commonService.getInstance();
    this.searchTerms = new Subject();
    var _$props = this.$props,
      value = _$props.value;
    return {
      stateValue: value,
      searchOptions: [{ property: 45, value: 88 }],
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
  components: {
    [Input.name]: Input
  },
  beforeMount() {
    // new Observable(ob => {
    //   const { next, error } = ob;
    //   this.commonSer
    //     .getColleague("456789")
    //     .then(res => next(res))
    //     .catch(err => error(err));
    // }).subscribe(res => console.log(res));
    this.mySub = this.searchTerms
      .asObservable()
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(_ => (this.fetching = true)),
        switchMap(term => {
          const query = encodeURI(term);
          return new Observable(ob => {
            this.commonSer
              .getColleague(term)
              .then(res => {ob&&ob.next(res);ob&&ob.complete()})
              .catch(err => ob&&ob.error(err));
          });
        }),
        mergeMap(_ => {
          return this.doFilter(_);
        })
      )
      .subscribe(
        data => {
          this.fetching = false;
          this.searchOptions = data.map(c => ({
            value: c.EMPNO + "," + c.NICK_NAME + "," + c.USER_NAME,
            property: c
          }));
          console.log(this.searchOptions)
        },
        err => {
          this.commonSer.errDeal(err);
          this.fetching = false;
        }
      );
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  watch: {
    value: function value(value) {
      if (value) {
        value = value + "";
        this.commonSer
          .getColleague(value)
          .then(() => this.doFilter(_))
          .then(
            data => {
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
                    property: c
                  }));
                  this.searchOptions = alter;
                  this.selectedOption = alter[0].property;
                  this.emitColleagueOut(val);
                }
              } else {
                this.propagateChange("");
              }
            },
            err => {
              this.util.errDeal(err);
              this.propagateChange("");
            }
          );
        this.stateValue = val;
      }
    },
  },
  methods: {
      searchChange(searchText) {
        this.searchTerms.next(searchText);
      },
      propagateChange(v) {
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
      handleChange() {
        this.$emit("change", this.stateValue);
      },
      doFilter(_) {
        if (typeof this.miSearchFilter === "function") {
          const res = this.miSearchFilter(_);
          if (res instanceof Observable) {
            return res;
          } else {
            return of(res);
          }
        } else {
          return of(_);
        }
      }
    }
};
</script>

<style>
</style>
