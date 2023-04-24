import Head from "next/head";
import React from "react";

function HeadMetaData({
  title = "Follofox",
  description = "",
}: {
  title?: string;
  description?: string;
}) {
  function addJsonLd(jsonData) {
    return {
      __html: `${jsonData}`,
    };
  }

  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
    </Head>
  );
}

export default HeadMetaData;
