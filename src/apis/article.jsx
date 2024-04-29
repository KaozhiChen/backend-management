import { request } from '@/utils';

export function getChannelAPI() {
  return request({
    url: '/channels',
    method: 'GET',
  });
}

//public article
export function createArticleAPI(data) {
  return request({
    url: '/mp/articles?draft=false',
    method: 'POST',
    data,
  });
}

//get article list API
export function getArticleListAPI(params) {
  return request({
    url: '/mp/articles',
    method: 'GET',
    params,
  });
}
