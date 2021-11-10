import styles from "../styles/Home.module.css";
import { Toolbar } from "../components/toolbar";
import imageUrlBuilder from "@sanity/image-url";
import { useState, useEffect } from "react";
import BlockContent from "@sanity/block-content-to-react";
// References
// https://www.youtube.com/watch?v=B1sXeodBLj4
// https://www.youtube.com/watch?v=xtItzwYG6oQ
// https://www.youtube.com/watch?v=NO7_jgzVgbc
// https://www.youtube.com/watch?v=9P8mASSREYM&list=PLC3y8-rFHvwgC9mj0qv972IO5DmD-H0ZH&index=2
export default function Home({ posts }) {
  const [mappedPosts, setMappedPosts] = useState([]);

  useEffect(() => {
    if (posts.length) {
      const imgBuilder = imageUrlBuilder({
        projectId: "jt741aqq",
        dataset: "production",
      });

      setMappedPosts(
        posts.map((p) => {
          return {
            ...p,
            mainImage: imgBuilder.image(p.image).width(500).height(250),
          };
        })
      );
    } else {
      setMappedPosts([]);
    }
  }, [posts]);

  return (
    <div>
      <Toolbar />
      <div className={styles.main}>
        <div className={styles.feed}>
          {mappedPosts.length ? (
            mappedPosts.map((p, index) => (
              <div key={index} className={styles.post}>
                <h1>Hi, I am </h1>
                <h1>{p.name}</h1>
                <div className={styles.body}>
                  <BlockContent blocks={p.bio} />
                </div>

                <img className={styles.mainImage} src={p.mainImage} />
              </div>
            ))
          ) : (
            <>No author Yet</>
          )}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (pageContext) => {
  const query = encodeURIComponent('*[ _type == "author" ]');
  const url = `https://jt741aqq.api.sanity.io/v1/data/query/production?query=${query}`;
  const result = await fetch(url).then((res) => res.json());

  if (!result.result || !result.result.length) {
    return {
      props: {
        posts: [],
      },
    };
  } else {
    return {
      props: {
        posts: result.result,
      },
    };
  }
};
