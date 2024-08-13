import GridIcon from '../../../components/icon/GridIcon';
import HeartIcon from '../../../components/icon/HeartIcon';
import BookmarkIcon from '../../../components/icon/BookmarkIcon';

import styles from './FilterMenu.module.css';
import GridFillIcon from '../../icon/GridFillIcon';
import HeartFillIcon from '../../icon/HeartFillIcon';
import BookmarkFillIcon from '../../icon/BookmarkFillIcon';
import { ReactNode } from 'react';

type Filter = 'post' | 'like' | 'bookmark';

interface FilterMenuProps {
  filter: Filter;
  handleChangeFilter: (filter: Filter) => void;
}

const listItems: { icon: ReactNode; fillIcon: ReactNode; name: Filter }[] = [
  {
    icon: <GridIcon size={30} />,
    fillIcon: <GridFillIcon size={30} />,
    name: 'post',
  },
  {
    icon: <HeartIcon size={30} />,
    fillIcon: <HeartFillIcon size={30} />,
    name: 'like',
  },
  {
    icon: <BookmarkIcon size={30} />,
    fillIcon: <BookmarkFillIcon size={30} />,
    name: 'bookmark',
  },
];

function FilterMenu({ filter, handleChangeFilter }: FilterMenuProps) {
  return (
    <ul className={styles.container}>
      {listItems.map(item => (
        <li
          className={styles.item}
          key={item.name}
          onClick={() => handleChangeFilter(item.name)}
        >
          {filter === item.name ? item.fillIcon : item.icon}
          <p
            className={`${styles.itemText} ${
              filter === item.name && styles.filtered
            }`}
          >
            {item.name}
          </p>
          <div
            className={`${styles.bar} ${
              filter === item.name && styles.filtered
            }`}
          />
        </li>
      ))}
    </ul>
  );
}

export default FilterMenu;
export type { Filter };
