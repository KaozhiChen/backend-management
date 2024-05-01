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

//edit article
export function editArticleAPI(data) {
  return request({
    url: `/mp/articles/${data.id}?draft=false`,
    method: 'PUT',
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

//del article API
export function delArticleAPI(id) {
  return request({
    url: `/mp/articles/${id}`,
    method: 'DELETE',
  });
}

//get article's details by ID
export function getArticleById(id) {
  return request({
    url: `/mp/articles/${id}`,
    //method: 'GET',
  });
}
