import { useState, useEffect } from 'react';
import { Table, Button, Input, ConfigProvider, theme } from 'antd';
import { copyToClipboard } from 'clipboard';

const Index = () => {
  const [data, setData] = useState({});
  const [searchText, setSearchText] = useState('');

  const loadData = async () => {
    const response = await fetch('/prompt.json');
    const json = await response.json();
    setData(json);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCopy = (value) => {
    navigator.clipboard.writeText(value);
    alert(`Copied ${value} to clipboard!`);
  };

  const dataSource = Object.keys(data)
    .filter(
      (key) =>
        key.includes(searchText) || data[key].toString().includes(searchText)
    )
    .map((key) => ({
      key,
      value: data[key]
    }));

  const columns = [
    {
      title: 'Act as',
      dataIndex: 'key',
      key: 'key'
    },
    {
      title: 'Prompt',
      dataIndex: 'value',
      key: 'value',
    },
    {
      // title: 'Copy',
      key: 'copy',
      render: (_, record) => (
        <Button onClick={() => handleCopy(record.value)}>Copy</Button>
      ),
    },
  ];

  return (
    <>
    {/* <div style={{ backgroundColor: "#343541" }}> */}
      <ConfigProvider
    theme={{
      algorithm: theme.darkAlgorithm,
    }}
  >
   
    <center>
      <br/>
    <h1 style={{ fontFamily: "sans-serif"}}>xPrompt</h1>
    <br/>
      <Input
        placeholder="Search"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
        style={{ marginBottom: 16, width: '70%'}}
      />
      <Table dataSource={dataSource} columns={columns} pagination={true} style={{ width: '70%' }}/>
      <br/>
      <Button onClick={() => setSearchText('')}>Reset</Button>
      <br/>
      <br/>
      <footer>
      <span style={{ fontFamily: "sans-serif"}}>🎨 Art by Rishub</span>
      </footer>
       <br/>
      </center>
      </ConfigProvider>
      {/* </div> */}
    </>
  );
};

export default Index;
