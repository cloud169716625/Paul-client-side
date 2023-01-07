import { getConfig } from 'lib';
const brandsConfig = (action) => getConfig({ module: 'Notifications', action });

const prefix = `api/v1/client/notifications/all`;

export const getNotificationConfig = () => {
  const localData = localStorage.getItem('CurrentUser__client');
  let userId = ''
  if(localData ==null || localData==undefined){
    userId = '';
  }else{
    const data = JSON.parse(localData);
    userId = data.id;
  }   
  return{
  url: `${prefix}`,
  defaultData: {
    "advancedSearch": {
      "fields": ['toUserId'
      ],
      "keyword": userId
    },
    "keyword": "",
    "pageNumber": 0,
    "pageSize": 0,
    "orderBy": [
      "id"
    ],
    "startDate": "2022-01-19",
    "endDate": "2022-12-19T15:48:09.076Z"
  },
  config: brandsConfig('Read'),
}};


