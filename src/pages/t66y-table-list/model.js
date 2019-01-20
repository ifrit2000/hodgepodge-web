import { findTopicFidMap, findTopicStatusMap } from '@/pages/t66y-table-list/service';
import React from 'react';
import { Select } from 'antd';
import { addRule, findTopicList, queryRule, removeRule, updateRule } from './service';

export default {
  namespace: 't66yTableList',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *initializeTopicStatus({}, { call, put }) {
      const response = yield call(findTopicStatusMap);
      const { data: topicStatusMap } = response;
      const topicStatusSelectorOption = [];
      for (const key in topicStatusMap) {
        topicStatusSelectorOption.push(
          <Select.Option key={key}>{topicStatusMap[key]}</Select.Option>
        );
      }
      yield put({
        type: 'initializePage',
        payload: {
          topicStatusSelectorOption,
          topicStatusMap,
        },
      });
    },
    *initializeTopicFid({}, { call, put }) {
      const response = yield call(findTopicFidMap);
      const { data: topicFidMap } = response;
      const topicFidSelectorOption = [];
      for (const key in topicFidMap) {
        topicFidSelectorOption.push(<Select.Option key={key}>{topicFidMap[key]}</Select.Option>);
      }
      yield put({
        type: 'initializePage',
        payload: {
          topicFidSelectorOption,
          topicFidMap,
        },
      });
    },
    *fetch2({ payload }, { call, put }) {
      const response = yield call(findTopicList, payload);
      const {
        data: { list, total, pageSize, pageNum: current },
      } = response;
      const result = {
        list,
        pagination: {
          total,
          pageSize,
          current,
        },
      };
      yield put({
        type: 'save',
        payload: result,
      });
    },

    *fetch({ payload }, { call, put }) {
      const response = yield call(queryRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    initializePage(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
