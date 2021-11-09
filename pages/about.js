import imageUrlBuilder from "@sanity/image-url";
import { useState, useEffect } from "react";
import styles from "../styles/About.module.css";
import BlockContent from "@sanity/block-content-to-react";
import { Toolbar } from "../components/toolbar";

export const About = ({ title, body, image }) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const imgBuilder = imageUrlBuilder({
      projectId: "jt741aqq",
      dataset: "production",
    });

    setImageUrl(imgBuilder.image(image));
  }, [image]);

  return (
    <div>
      <Toolbar />
      <div className={styles.main}>
        <h1>{title}</h1>
        {imageUrl && <img className={styles.mainImage} src={imageUrl} />}

        <div className={styles.body}>
          <BlockContent blocks={body} />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (pageContext) => {
  const query = encodeURIComponent(
    `*[ _type == "post" && slug.current == "about-me" ]`
  );
  const url = `https://jt741aqq.api.sanity.io/v1/data/query/production?query=${query}`;

  const result = await fetch(url).then((res) => res.json());
  const post = result.result[0];

  if (!post) {
    return {
      notFound: true,
    };
  } else {
    return {
      props: {
        body: post.body,
        title: post.title,
        image: post.mainImage,
      },
    };
  }
};

export default About;
