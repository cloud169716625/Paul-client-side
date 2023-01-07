import { useState, useEffect } from 'react';  
import { ArticlesData } from './mockup'
import { SupportArticleCard } from 'components'
import Pagination from 'components/Pagination'  
 
export const ArticleList = () => { 
  const [curPage, setCurPage] = useState(1);
  const RECORD_PER_PAGE = 4
  const [indexOfLastRecord, setIndexOfLastRecord] = useState(0) 
  const [indexOfFirstRecord, setIndexOfFirstRecord] = useState(0) 
  const [articles, setArticles] = useState([])

  const [message, setMessage] = useState('')

  const handleSendMessage = () => {
    const submitData = {
      id: articles.length + 1,
      date: "5 Min",
      avatar: "",
      name: "Paul Elliot",
      role: "EMPLOYEE",
      content: message
    }

    setArticles([...articles.reverse(), submitData].reverse())

    setMessage("")
  }

  console.log(articles)

  useEffect(() => {
    setIndexOfLastRecord(curPage * RECORD_PER_PAGE)
    setIndexOfFirstRecord(indexOfLastRecord - RECORD_PER_PAGE)
  }, [curPage, indexOfLastRecord])

  useEffect(() => {
    setArticles(ArticlesData.reverse())
  },[])

  return (
    <div className="flex flex-col flex-grow p-[24px] md:p-10 gap-[12px] md:gap-[40px]">
      <div className="bg-[#1E1E2D] rounded-[8px]"> 
        <div className="p-[40px] flex">
          <div className="rounded-[8px] bg-[#1C3238] h-[93px] w-[93px] p-[16px] flex items-center justify-center mr-[40px]">
            <img src="/img/vuesax-bulk-receipt-2.svg" alt="edit-icon" />
          </div>
          <div className="flex items-center">
            <div>
              <div className="text-white text-[24px]">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam…
              </div>
              <div className="flex items-center md:flex-row text-[14px] text-[#474761]">
                By Paul Elliott&nbsp;<div className="p-[4px] bg-[#1C3238] text-[#0BB783] rounded-[4px]">EMPLOYEE</div>&nbsp;Updated 3 Hours Ago - February 5th, 2022 at 5:30 PM
              </div>
            </div>
          </div>
        </div>

        <div style={{borderBottom: '1px dashed #323248', width: '100%'}} />

        <div className="p-[40px]">
          <div>
            <div className="flex gap-[20px]">
              <div className="rounded-[8px] h-[52px] w-[473px] pl-[20px] pr-[16px] border-[#323248] border-[1px] border-dashed flex items-center justify-between">
                <h1 className="text-[#92928F] text-[14px]">Ticker Number</h1>
                <h1 className="text-[#fff] text-[14px]">12580</h1>
              </div>
              <div className="rounded-[8px] h-[52px] w-[473px] pl-[20px] pr-[16px] border-[#323248] border-[1px] border-dashed flex items-center justify-between">
                <h1 className="text-[#92928F] text-[14px]">Opened By</h1>
                <h1 className="text-[#fff] text-[14px]">Paul Elliot</h1>
              </div>
            </div>
            <div className="flex mt-[20px] gap-[20px]">
              <div className="rounded-[8px] h-[52px] w-[473px] pl-[20px] pr-[16px] border-[#323248] border-[1px] border-dashed flex items-center justify-between">
                <h1 className="text-[#92928F] text-[14px]">Product / Service</h1>
                <h1 className="text-[#fff] text-[14px]">Not Applicable</h1>
              </div>
              <div className="rounded-[8px] h-[52px] w-[473px] pl-[20px] pr-[16px] border-[#323248] border-[1px] border-dashed flex items-center justify-between">
                <h1 className="text-[#92928F] text-[14px]">Department</h1>
                <h1 className="text-[#fff] text-[14px]">Department Name</h1>
              </div>
            </div>
          </div>

          <div className="bg-[#171723] w-[100%] h-[288px] rounded-[8px] mt-[40px]">
            <textarea onChange={(e) => setMessage(e.target.value)} value={message} placeholder="Enter Message..." style={{borderBottom: '1px dashed #323248'}} className="h-[227px] appearance-none block w-full px-[16px] py-[16px] text-base font-normal text-[#92928f] placeholder:text-[#92928F] bg-[#171723] bg-clip-padding bg-no-repeat border-none rounded-[8px] transition ease-in-out m-0 focus:bg-[#171723] focus:border-none focus:outline-none disabled:bg-[#323248] disabled:text-[#92928F]" />
            <div className="p-[16px]">
              <button onClick={handleSendMessage} type="button" className="bg-[#3699FF] w-[111px] h-[29px] text-[#fff] rounded-[4px]">Send Message</button>
            </div>
          </div>
        
          {
            articles?.slice(indexOfFirstRecord, indexOfLastRecord)?.reverse()?.map((item) => (
              <div key={item.id}>
                <SupportArticleCard totalCnt={articles.length} data={item} />
              </div>
            ))
          }

          <div className="mt-[40px]">
            <Pagination totalCount={Math.ceil(articles.length/4)} currentPage={curPage} onChange={(curPageNum) => setCurPage(curPageNum)} />
          </div>
        </div>
      </div> 
    </div>
  );
};
