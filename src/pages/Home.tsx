import React from 'react';
import Layout from '../components/Layout';
import ShowList from '../components/ShowList';

const Home = () => {
  return (
    <Layout enableSearch>
      <ShowList />
    </Layout>
  );
}

export default Home;

