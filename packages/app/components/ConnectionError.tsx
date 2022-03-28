import React from "react";
import { Layout, Text } from "@ui-kitten/components";

const ConnectionError = () => {
  return (
    <Layout style={{ flex: 1 }}>
      <Text status="danger">
        Connection error has occurred. Is the server running?
      </Text>
    </Layout>
  );
};

export default ConnectionError;
