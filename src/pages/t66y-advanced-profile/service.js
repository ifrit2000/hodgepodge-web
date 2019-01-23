import request from '@/utils/request';

export async function queryAdvancedProfile() {
  return request('/api/advanced-profile/advanced');
}

export async function fetchTopicDetail(topicId) {
  return request('/t66y/topic/'+topicId);
}

