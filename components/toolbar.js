import { useRouter } from "next/router";
import styles from "../styles/Toolbar.module.css";

export const Toolbar = () => {
  const router = useRouter();

  return (
    <div className={styles.main}>
      <div onClick={() => router.push("/")}>Home</div>
      <div onClick={() => router.push("/about")}>About Me</div>
      <div>
        <a
          href="https://twitter.com/mehtalalit6409"
          target="_blank"
          rel="noreferrer"
        >
          Twitter
        </a>
      </div>

      <div>
        <a href="https://github.com/lalit6409" target="_blank" rel="noreferrer">
          GitHub
        </a>
      </div>
    </div>
  );
};
