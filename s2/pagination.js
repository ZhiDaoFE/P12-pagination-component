const Pagination = ((document) => {
  function hasCls(root, dom, cls) {
    if (!dom) {
      return false;
    }

    while (dom !== root) {
      if (dom.classList.contains(cls)) {
        return true;
      }

      dom = dom.parentNode;
    }

    return false;
  }

  const defaultCls = 'zd-pagination';
  const listCls = 'zd-pagination-list';
  const itemCls = 'zd-pagination-item';
  const ellipsisCls = 'zd-pagination-item--ellipsis';
  const arrowCls = 'zd-pagination-item--arrow';
  const leftCls = 'js-left';
  const rightCls = 'js-right';
  const activeCls = 'z-active';
  const disabledCls = 'z-dis';
  const defaultPageSize = 10;
  const ellipsisNumber = -1;
  const currentNumberRangeRadius = 2;
  const pageStartNumber = 1;
  
  return class extends BaseComWithDom {
    // _total;
    // _pageSize;
    // _pageMax;
    // _current;
    // _onChange;

    constructor(props = {}) {
      super({...props, cls: props.cls ? `${props.cls} ${defaultCls}` : defaultCls});

      this.onClick = this.onClick.bind(this);

      this._build();
    }

    init(props = {}) {
      const { total, pageSize = defaultPageSize, defaultCurrent = pageStartNumber, onChange } = props;

      this._total = Number(total);
      if (this._total === NaN || this._total < 0) {
        throw new TypeError(`total 参数错误: ${total}`);
      }

      this._pageSize = Number(pageSize);
      if (this._pageSize === NaN || this._pageSize <= 0) {
        throw new TypeError(`pageSize 参数错误: ${pageSize}`);
      }

      this._pageMax = Math.ceil(this._total / this._pageSize);
      if (defaultCurrent <= pageStartNumber) {
        this._current = pageStartNumber
      } else if (defaultCurrent >= this._pageMax) {
        this._current = this._pageMax;
      } else {
        this._current = defaultCurrent;
      }
      this._onChange = onChange || (() => {});
    }

    _getPaginationNum() {
      const nums = [];

      for(let i = pageStartNumber; i <= this._pageMax; i++) {
        if (i === pageStartNumber
          || i === this._pageMax
          || (Math.abs(i - this._current) <= currentNumberRangeRadius)
          || (i > this._current && i <= 2 * currentNumberRangeRadius + 1)
          || (i < this._current && i >= this._pageMax - 2 * currentNumberRangeRadius)) {
          nums.push(i);
          continue;
        }

        if (nums[nums.length - 1] !== ellipsisNumber) {
          nums.push(ellipsisNumber);
        }
      }


      return nums;
    }

    render() {
      const nums = this._getPaginationNum();

      this.getRoot().innerHTML = `
        <ul class="${listCls}">
          <li class="${itemCls} ${arrowCls} ${leftCls} ${this._current === pageStartNumber ? disabledCls : ''}">
            <img src="./assets/arrow-left${this._current === pageStartNumber ? '-dis' : ''}.svg" /></li>
          ${nums.map(i => {
            if (i === ellipsisNumber) {
              return `<li class="${itemCls} ${ellipsisCls}"><img src="./assets/ellypsis.svg" /></li>`
            }

            return `<li class="${itemCls} ${i === this._current ? activeCls : ''}">${i}</li>`
          }).join('')}
          <li class="${itemCls} ${arrowCls} ${rightCls} ${this._current === this._pageMax ? disabledCls : ''}">
            <img src="./assets/arrow-right${this._current === this._pageMax ? '-dis' : ''}.svg" /></li>
        </ul>`;

      return this;
    }

    _build() {
      this.render();
      this.getRoot().addEventListener('click', this.onClick);
    }

    _changePageMax(total, pageSize) {
      this._pageMax = Math.ceil(total / pageSize);
      if (this._current > this._pageMax) {
        this._current = this._pageMax;
      }

      return this;
    }

    setPageSize(pageSize) {
      pageSize = Number(pageSize || defaultPageSize);
      if (pageSize === NaN || pageSize <= 0) {
        return this;
      }

      const oldPageSize = this._pageSize;
      this._pageSize = pageSize;
      this._changePageMax(this._total, this._pageSize);
      if (this._pageSize !== oldPageSize) {
        this._onChange(this._current, this._pageSize);
      }

      return this.render();
    }

    getPageSize() {
      return this._pageSize;
    }

    setTotal(total) {
      total = Number(total);
      if (total === NaN || total <= 0) {
        return this;
      }

      this._total = total;
      const oldCurrent = this._current;
      this._changePageMax(this._total, this._pageSize);
      if (this._current !== oldCurrent) {
        this._onChange(this._current, this._pageSize);
      }

      return this.render();
    }

    getTotal() {
      return this._total;
    }

    prev() {
      return this.goto(this._current - 1);
    }

    next() {
      return this.goto(this._current + 1);
    }

    goto(page) {
      const oldCurrent = this._current;

      if (page <= pageStartNumber) {
        this._current = pageStartNumber
      } else if (page >= this._pageMax) {
        this._current = this._pageMax;
      } else {
        this._current = page;
      }

      if (this._current !== oldCurrent) {
        this._onChange(this._current, this._pageSize);
      }

      return this.render();
    }

    onClick(event) {
      const { target } = event;
      const root = this.getRoot();
      if (hasCls(root, target, leftCls)) {
        return this.prev();
      }

      if (hasCls(root, target, rightCls)) {
        return this.next();
      }

      if (hasCls(root, target, ellipsisCls)) {
        return;
      }

      if (hasCls(root, target, itemCls)) {
        this.goto(Number(target.innerText));
      }
    }

    destory() {
      this.getRoot().removeEventListener('click', this.onClick);
      this.getRoot().innerHTML = '';

      return this;
    }
  }
})(document);