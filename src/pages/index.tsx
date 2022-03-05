import styles from './index.less';
import { history } from 'umi';

export default function IndexPage() {
  const onClick = () => {
    history.push(`/users`);
  };
  return (
    <div>
      <button className={styles.title} onClick={onClick}>
        Go to user page
      </button>
    </div>
  );
}
