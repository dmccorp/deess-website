import styles from './styles.module.scss';
import deess from 'assets/logo.svg';

export default function Maintenance() {
  return (
    <div className={styles.container}>
      <div>
        <img src={deess.src} alt="Logo" />
        <div className={styles.circle}>
          <div className={styles.text}>
            <h1>This site is under maintenance</h1>
            <p>We&apos;re preparing to light you better</p>
          </div>
        </div>
      </div>
    </div>
  );
}
