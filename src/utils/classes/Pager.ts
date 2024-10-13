import { logsPerPage } from 'configs/globals';
import { TRunList } from 'utils/types/others';

class Pager {
  private filteredList: TRunList;
  private searchParams: URLSearchParams;

  constructor (filteredList: TRunList, searchParams: URLSearchParams) {
    this.filteredList = filteredList;
    this.searchParams = searchParams;
  }

  get count() {
    const count = this.filteredList.length;
    return count;
  }

  get maxPage() {
    const count = this.count;
    const maxPage = Math.max(1, Math.ceil(count / logsPerPage));
    return maxPage;
  }

  private get i() {
    const i = this.maxPage - this.currentPage;
    return i;
  }

  get min() {
    const min = logsPerPage * this.i;
    return min
  }

  get max() {
    const max = Math.min(logsPerPage * (this.i + 1), this.count) - 1;
    return max;
  }

  get currentPage() {
    const page = parseInt(this.searchParams.get('p') || '1');
    return page;
  }
}

export default Pager;