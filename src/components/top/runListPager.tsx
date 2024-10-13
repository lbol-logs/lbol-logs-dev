import { RunListContext } from 'contexts/runListContext';
import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import Pager from 'utils/classes/Pager';
import { TObjAny } from 'utils/types/common';

function RunListPager() {
  const { filteredList } = useContext(RunListContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const pager = new Pager(filteredList, searchParams);
  const { currentPage } = pager;

  function getPages() {
    const range = 2;
    const { maxPage } = pager;

    const pages = [1];
    for (let i = -range; i <= range; i++) {
      const page = Math.min(Math.max(currentPage + i, 1), maxPage);
      pages.push(page);
    }
    pages.push(maxPage);

    const _pages: Array<number | undefined> = [];
    let lastPage = 0;
    for (const page of pages) {
      if (_pages.includes(page)) continue;
      const diff = Math.abs(page - lastPage);
      if (diff > 1) _pages.push(undefined);
      _pages.push(page)
      lastPage = page;
    }
    return _pages;
  }

  const pages = getPages();

  function onClick(page: number) {
    if (page === 1) searchParams.delete('p');
    else searchParams.set('p', page.toString());
    setSearchParams(searchParams, { replace: true });
  }

  const className = 'p-pager__page';

  function getPage({ label, offset, page, key }: { label: string | number, offset?: number, page?: number, key?: string | number }) {
    const props: TObjAny = {
      className
    };

    page = page || (currentPage + (offset as number));
    const hasPage = pages.includes(page);
    const isCurrentPage = page === currentPage;
    if (isCurrentPage) {
      props.className += ` ${className}--current`;
    }
    else if (hasPage) {
      props.className += ` ${className}--valid`;
      props.onClick = () => onClick(page as number);
    }
    return (
      <li {...props} key={key}>
        {label}
      </li>
    );
  }

  const prev = getPage({ label: '<', offset: -1 });
  const next = getPage({ label: '>', offset: 1 });

  return (
    <div className="p-run-list__pager">
      <ul className="p-pager">
        {prev}
        {pages.map((page, i) => {
          const li = getPage({ label: page || '...', page: page, key: i });
          return li;
        })}
        {next}
      </ul>
    </div>
  );
}

export default RunListPager;