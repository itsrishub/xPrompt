import { useState, useEffect } from 'react';
import { Table, Button, Input, ConfigProvider, theme } from 'antd';
// import { copyToClipboard } from 'clipboard';

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

  const handleCopy = async (record) => {
    navigator.clipboard.writeText(record.value);
    document.getElementById(record.key).style.backgroundColor = 'green';
    document.getElementById(record.key).style.color = '#fff';
    document.getElementById(record.key).innerHTML = '✓ Copied';
    setTimeout(() => {
      document.getElementById(record.key).style.backgroundColor = '#141414';
      document.getElementById(record.key).style.color = '';
      document.getElementById(record.key).innerHTML = 'Copy';
    }, 5000); 
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
    // {
    //   title: 'Act as',
    //   dataIndex: 'key',
    //   key: 'key',
    //   width: '10%'
    // },
    // {
    //   title: 'Prompt',
    //   dataIndex: 'value',
    //   key: 'value',
    // },
    {
      title: 'Prompts',
      key: 'copy',
      render: (_, record) => (
        <>
        
        <span style={{ wordBreak: "break-word", maxWidth: "70%", display: "inline-flex" }}>Act as {record.key}:</span><Button id={record.key} style={{float: "right"}} onClick={() => handleCopy(record)}>Copy</Button><br/><br/><hr/><br/><span>{record.value}</span>
        <br/>
        <br/>
        </>
      ),
      width: '90%'
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
    <title>xPrompt</title>
    <center>
    <br/>
    {/* <span style={{float: "right"}}>
    {localStorage.getItem('email')? localStorage.getItem('email').replace('@gmail.com', ''):
    <a href='/auth'>Login/Signup</a>}
    </span> */}
      <br/>
        <center>
    <h1>xPrompt</h1>
{/* <br/>
<Button>Programming</Button>&nbsp;<Button>Fitness</Button> */}
    </center>
    <br/>
      <Input
        placeholder="Search"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
        style={{ marginBottom: 16, width: '60%'}}
      />
      <Table dataSource={dataSource} columns={columns} pagination={true} style={{ width: '85%' }}/>
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
