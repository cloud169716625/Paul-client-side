import { useNavigate } from 'react-router-dom';
import { Button, } from 'components';
import { Input, Spin } from 'antd';
import { useDispatch } from 'react-redux';
import { searchArticles } from 'store';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
export const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ac = new AbortController();
  const { searchLoading, searchResults } = useSelector((state) => state.articles);
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const darkBg = true;
  async function onChange(e) {
    ac.abort();
    const value = e.target.value;
    value.trim();
    if (value.length > 0) {
      setShowResults(true);
      const keyword = value;
      const signal = ac.signal;
      await dispatch(searchArticles({ keyword, signal }));
    }else{
      setResults([]);
      setShowResults(false);
    }
  }
  useEffect(() => {
    console.log(searchResults);
    if (searchResults) {
      setResults(searchResults);
    }
  }, [searchResults]);
  return (
    <div style={{
     position: 'relative',
    }}>

    <div className="bg-[#1E1E2D] p-[12px] rounded-[8px]">
      <div className="bg-[#1E1E2D] p-[8px] rounded-[8px] flex items-center justify-between">
        <div className=" pt-[8px] pb-[8px] flex items-center gap-[40px] w-[80%]">
       <Input
              placeholder={"Search Articles"}
              onChange={onChange}
              className={`inputX  w-[100%] pl-[12px] text-[#92928f] placeholder:text-[#92928f] focus-visible:outline-none ${
                darkBg ? 'bg-[#171723]' : 'bg-[transparent]'
              }`}
       ></Input>
        </div>
        <Button
          onClick={() =>
            navigate('/client/dashboard/support/knowledge-base/articles/add/new')
          }
        >
          {"Add New Article"}
        </Button>
      </div>
    </div>
    {showResults && (
      <div style={
        {
          position: 'absolute',
          top: '80%',
          left: '0',
          zIndex: '100',
          paddingLeft: "20px",
          paddingRight: "10px",
          width: '80%',
        }
      }>
        <div style={{
            maxHeight: '300px',
            minHeight: '100px',
            borderBottomLeftRadius: '20px',
            borderBottomRightRadius: '20px',
            backgroundColor: '#171723',
            boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
            padding: '12px',
        }}>

        <Spin spinning={searchLoading}>
          <div style={
            {
              
          overflowY: 'scroll',
            }
          }>
            {results.map((item) => (
              <div 
              style={
                {
                  cursor: 'pointer',
                }
              }
              onClick={
                () => navigate(`/client/dashboard/support/knowledge-base/articles/view/${item?.id}`)
              } key={item?.id} className="text-[#92928f]">
                {item?.title}
              </div>
            )
            )}
          </div>
        </Spin>
        </div>
      </div>
    )}
    </div>
  );
};
