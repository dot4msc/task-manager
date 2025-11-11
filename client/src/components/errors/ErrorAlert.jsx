import styles from './ErrorAlert.module.css';
import errorImage from '../../assets/error-image.png';

export default function ErrorAlert({onClick, children}) {
  return(
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal"]}>
        <div className={styles["container"]}>
          <img width="10%" src={errorImage}/>
          <p>{children}</p>
        </div>
        <button className={styles["ok-button"]} onClick={onClick}>OK</button>
      </div>
    </div>
  )
}