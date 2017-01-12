/* eslint-disable no-console */

import React, { Component } from 'react';
import Select from '../src/index';
import CustomTrigger from './trigger/customTrigger';
import '../assets/index.scss';

const optionData = [
  { id: {}, name: '全部' },
  { id: { value: 1 }, name: '养生食品分类' },
  { id: { value: 2 }, name: '休闲食品分类' },
  { id: { value: 3 }, name: '药效性食物分类' },
  { id: { value: 3 }, name: '药效性食物分类' },
  { id: { value: 3 }, name: '药效性食物分类' },
  { id: { value: 3 }, name: '药效性食物分类' },
  { id: { value: 3 }, name: '药效性食物分类' },
  { id: { value: 3 }, name: '药效性食物分类' },
  { id: { value: 3 }, name: '药效性食物分类' },
  { id: { value: 3 }, name: '药效性食物分类' },
  { id: { value: 3 }, name: '药效性食物分类' },
  { id: { value: 3 }, name: '药效性食物分类' },
  { id: { value: 3 }, name: '药效性食物分类' },
  { id: { value: 3 }, name: '药效性食物分类' },
  { id: { value: 3 }, name: '药效性食物分类' },
  { id: { value: 3 }, name: '药效性食物分类' },
  { id: { value: 3 }, name: '药效性食物分类' },
  { id: { value: 3 }, name: '药效性食物分类' },
  { id: { value: 3 }, name: '药效性食物分类' },
  { id: { value: 3 }, name: '药效性食物分类' },
  { id: { value: 3 }, name: '药效性食物分类' },
  { id: { value: 3 }, name: '药效性食物分类' },
  { id: { value: 3 }, name: '药效性食物分类' },
  { id: { value: 3 }, name: '药效性食物分类' },
  { id: { value: 4 }, name: '列表中隐藏' }
];

export default class Example extends Component {
  changeHandler = (ev, data) => {
    console.log(data);
  }

  syncData = () => {
    console.log(1212);
  }

  render() {
    return (
      <form>
        <Select
          placeholder=""
          className="custom-select"
          data={optionData}
          optionValue="id"
          optionText="name"
          value={{ value: 2 }}
          onChange={this.changeHandler}
          placeholder="选择商品分组"
          trigger={CustomTrigger}
          onOpen={this.syncData}
        />
      </form>
    );
  }
}
