//get channel list
import { useEffect, useState } from 'react';
import { getChannelAPI } from '@/apis/article';

function useChannel() {
  const [channelList, setChannelList] = useState([]);
  useEffect(() => {
    //1.封装函数，在函数内调用接口
    const getChannelList = async () => {
      const res = await getChannelAPI();
      setChannelList(res.data.channels);
    };
    //2.调用函数
    getChannelList();
  }, []);
  return { channelList };
}

export { useChannel };
