import Head from "next/head";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [cookie, setCookie] = useState("");
  useEffect(() => {
    setCookie(Cookies.get("feature-flags"));
  }, []);
  return (
    <>
      <Head>
        <title>Edge Middleware / Config Example</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div>{cookie}</div>
      </main>
    </>
  );
}
