import CommonHttpClient from './commonHttpClient';

const POSTINGS_END_URL = '/postings';

const getAllPostings = (queryParams) => CommonHttpClient.get(POSTINGS_END_URL, {
  params: queryParams,
});
const getPostingDetails = (id) => CommonHttpClient.get(`${POSTINGS_END_URL}/${id}`);

export default {
  getAllPostings,
  getPostingDetails,
};
