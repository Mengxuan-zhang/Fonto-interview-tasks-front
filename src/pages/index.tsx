import './index.less';
import { history } from 'umi';

export default function IndexPage() {
  const onClick = () => {
    history.push(`/property`);
  };
  return (
    <div className="position">
      <button className="title" onClick={onClick}>
        Go to property page
      </button>
    </div>
  );
}
