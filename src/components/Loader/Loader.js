import { Watch } from 'react-loader-spinner';
import css from './Loader.module.css';

export const Loader = () => {
  return (
    <Watch
      className={css.Loader}
      height="80"
      width="80"
      radius="48"
      color="#4fa94d"
      ariaLabel="watch-loading"
      wrapperStyle={{}}
      visible={true}
    />
  );
};
