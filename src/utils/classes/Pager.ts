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

  get max() {
    const max = Math.max(this.count - logsPerPage * (this.currentPage - 1), 0) - 1;
    return max;
  }

  get min() {
    const min = Math.max(this.max - logsPerPage + 1, 0);
    return min;
  }

  get currentPage() {
    const page = parseInt(this.searchParams.get('p') || '1');
    return page;
  }
}

export default Pager;