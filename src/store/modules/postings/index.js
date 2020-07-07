/* eslint no-shadow: ["error", { "allow": ["state"] }] */

import postingsModel from './postings.model';
import postingsAPI from '../../../api/postings.api';

const loaderSwitch = (commitCtx, status) => {
  commitCtx('appLoader/setLoading', status, {
    root: true,
  });
};

// initial state
const state = {
  postings: [],
  postingDetails: {},
  selectedCountry: '',
  selectedDepartment: '',
  // Maintaining query parameters state to help implmenting infinite scroll
  postingsQueryParams: {
    limit: 10,
    offset: 0,
    totalFound: 0,
  },
};

// getters
const getters = {
  getPostings: (state) => state.postings,
  getFilteredPostings: (state) => {
    let filteredPosting = state.postings;
    if (state.selectedCountry === '' && state.selectedDepartment === '') {
      return filteredPosting;
    }
    if (state.selectedCountry !== '') {
      filteredPosting = filteredPosting.filter((post) => post.location.country === state.selectedCountry.code);
    }
    if (state.selectedDepartment !== '') {
      filteredPosting = filteredPosting.filter((post) => post.department.label === state.selectedDepartment);
    }
    return filteredPosting;
  },
  getPostingsQueryParams: (state) => state.postingsQueryParams,
  getPostingDetails: (state) => state.postingDetails,
  getCountryListFromPostings: (state) => {
    let distinctCountryList = [];
    if (state.postings.length > 0) {
      const distinctCountryCode = [...new Set(state.postings.map((post) => post.location.country))];
      distinctCountryList = distinctCountryCode.map((countryCode) => ({
        country: postingsModel.getCountryName(countryCode),
        code: countryCode,
      }));
    }
    return distinctCountryList;
  },
  getDepartmentListFromPostings: (state) => {
    let distinctDepartmentList = [];
    if (state.postings.length > 0) {
      distinctDepartmentList = [...new Set(state.postings.map((post) => post.department.label))];
    }
    return distinctDepartmentList;
  },
  getSelectedCountry: (state) => state.selectedCountry,
  getSelectedDepartment: (state) => state.selectedDepartment,
};

// actions
const actions = {

  /**
   * Funtion to get posting content from server
   * @date 2020-06-20
   * @param {any} {commit}
   * @param {any} queryParams
   * @returns {any}
   */
  fetchPostings({ commit }, queryParams) {
    loaderSwitch(commit, true);
    postingsAPI.getAllPostings(queryParams).then((response) => {
      loaderSwitch(commit, false);
      commit('setPostings', { postingsData: response.data.content }); // Saving the postings data to local state
      commit('setPostingsQueryParams', {
        offset: response.data.content.length + response.data.offset,
        totalFound: response.data.totalFound,
      });
    }, () => {
      loaderSwitch(commit, false);
    });
  },
  /**
   * Funtion to get posting description from server
   * @date 2020-06-20
   * @param {any} {commit}
   * @param {any} id
   * @returns {any}
   */
  fetchPostingDetails({ commit }, id) {
    loaderSwitch(commit, true);
    postingsAPI.getPostingDetails(id).then((response) => {
      loaderSwitch(commit, false);
      commit('setPostingDetails', { postingDetails: response.data }); // Saving the posting details data to local state
    }, () => {
      loaderSwitch(commit, false);
    });
  },
  setSelectedCountry({ commit }, country) {
    commit('setSelectedCountry', country);
  },
  setSelectedDepartment({ commit }, department) {
    commit('setSelectedDepartment', { department });
  },
  setPostingDetails({ commit }, { postingDetails }) {
    commit('setPostingDetails', { postingDetails });
  },
};

// mutations
const mutations = {
  setPostings(state, { postingsData }) {
    postingsData.forEach((post, index, currentArray) => {
      // eslint-disable-next-line no-param-reassign
      currentArray[index].location.countryName = postingsModel.getCountryName(post.location.country);
      return post;
    });
    state.postings = state.postings.concat(postingsData);
  },
  setPostingsQueryParams(state, { offset, totalFound }) {
    state.postingsQueryParams = { ...state.postingsQueryParams, offset, totalFound };
  },
  setPostingDetails(state, { postingDetails }) {
    if (postingDetails.location) {
      // eslint-disable-next-line no-param-reassign
      postingDetails.location.countryName = postingsModel.getCountryName(postingDetails.location.country);
    }
    state.postingDetails = postingDetails;
  },
  setSelectedCountry(state, country) {
    state.selectedCountry = country;
  },
  setSelectedDepartment(state, { department }) {
    state.selectedDepartment = department;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
