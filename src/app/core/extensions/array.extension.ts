interface Array<T> {
  sortBy(prop: string): this;
  distinct(): any[];
  groupBy(lambda: (a: any) => any): any;
}

Array.prototype.sortBy = function(prop: string) {
  return this.sort((a, b) => a[prop] - b[prop]);
};

Array.prototype.distinct = function() {
  return this.filter((x, idx, array) => array.indexOf(x) === idx);
};

Array.prototype.groupBy = function(lambda: (a: any) => any): any {
  return this.reduce((group, x) => {
    const val = lambda(x);
    group[val] = group[val] || [];
    group[val].push(x);
    return group;
  }, {});
};
