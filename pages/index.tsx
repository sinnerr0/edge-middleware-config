import Head from "next/head";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Statsig, { DynamicConfig } from "statsig-js";

async function StatsigInit() {
  await Statsig.initialize(
    process.env.NEXT_PUBLIC_STATSIG_CLIENT_KEY as string
  );
  const config: DynamicConfig = Statsig.getConfig("jaje-common");
  return config;
}

export default function Home() {
  const [cookie, setCookie] = useState("");
  const [config, setConfig] = useState("");
  useEffect(() => {
    const features = Cookies.get("feature-flags");
    features && setCookie(JSON.stringify(JSON.parse(features), null, 2));
    (async () => {
      const config = await StatsigInit();
      setConfig(
        JSON.stringify(
          {
            frontend: config.getValue("frontend"),
            backend: config.getValue("backend"),
            common: config.getValue("common"),
          },
          null,
          2
        )
      );
    })();
  }, []);
  return (
    <>
      <Head>
        <title>Edge Middleware / Config Example</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Edge Config</h1>
        <pre>{cookie}</pre>
        <h1>Statsig Config</h1>
        <pre>{config}</pre>
      </main>
    </>
  );
}
