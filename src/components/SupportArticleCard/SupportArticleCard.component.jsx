export const SupportArticleCard = (props) => {
  const { totalCnt, data } = props 

  return (
    <div style={{border: `1px solid ${data?.id % 2 === 0 ? "#8950FC" : "#FFA800"}`}} className="mt-[20px] w-[100%] p-[20px] rounded-[8px]">
      <div className="flex justify-between">
        <div className="flex">
          <div className="h-[47px] w-[47px] rounded-[5px] flex items-center justify-center bg-[#171723]">
            {
              data?.avatar !== "" ? (
                <img src={data?.avatar} className="rounded-[5px]" alt="avatar" />
              ) : (
                <h1 className="text-[#F64E60] text-[20px]">{data?.name.slice(0, 1)}</h1>
              )
            }  
          </div>
          <div className="ml-[16px]">
            <div className="text-[16px] text-white">{data?.name}</div>
            <div className="text-[14px] text-[#474761]">{data?.date}</div>
          </div>
          <div className="rounded-[4px] ml-[8px] h-[fit-content]" style={{padding: '4px 8px', background: `${data?.role === "CUSTOMER" ? "#392F28" : "#1C3238"}`, color:  `${data?.role === "CUSTOMER" ? "#FFA800" : "#0BB783"}`}}>
            {data?.role}
          </div>
        </div>
        <div style={{color: data?.id === totalCnt ? "#3699FF" : "#474761", cursor: "pointer"}} className="text-[16px]">
          Reply
        </div>
      </div>
      <div className="mt-[20px] text-[#92928F] text-[16px] line-[32px]">
        {data?.content}
      </div>
      {
        data?.id === totalCnt && (
          <div className="mt-[20px] bg-[#171723] justify-between rounded-[8px] h-[52px] flex p-[16px]">
            <input className="bg-[transparent] w-full focus:border-none focus:outline-none " placeholder="Write Something" />
            <button type="button" ><img src="/img/vuesax-bulk-send-2.svg" alt="send-icon" /></button>
          </div>
        )
      }
    </div>
  );
};
