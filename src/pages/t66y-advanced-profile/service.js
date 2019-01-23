import request from '@/utils/request';

export async function queryAdvancedProfile() {
  return request('/api/advanced-profile/advanced');
}

export async function queryTopicDetail(topicId) {
  return request('/t66y/topic/'+topicId);
}


export async function queryImage(fileId) {
  return request('/t66y/image/'+fileId);
}
