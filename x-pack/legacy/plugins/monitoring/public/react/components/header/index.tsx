/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React, { Component } from 'react';
import { timefilterSettings } from '../../config/defaults';
import { LocationContext, TimefilterParams } from '../../url_provider';

import {
  EuiSuperDatePicker,
  EuiSpacer,
  EuiTitle,
  EuiFlexGroup,
  EuiFlexItem
} from '@elastic/eui';

export type TimeRange = {
  start: string
  end: string
  refreshInterval?: number
}

type State = {
  recentlyUsedRanges: TimeRange[]
  loading: boolean
}

type Props = {
  onTimerTick?: (range: TimeRange) => void
  disableDatePicker?: boolean
  title?: string
}

const MAX_RECENT: number = 5;

const Title = ({ text }: { text?: string }) => {
  const title: string | undefined = text && text.trim();
  if (!title || !title.length) {
    return null;
  }
  return (
    <EuiFlexItem style={{ minWidth: 300 }}>
      <EuiTitle>
        <h2>{title}</h2>
      </EuiTitle>
    </EuiFlexItem>
  );
};

export class Header extends Component<Props, State> {

  static contextType = LocationContext;

  public state: State = {
    recentlyUsedRanges: [],
    loading: false
  };

  private currentTimefilterParams: TimefilterParams = {};
  private initialPromise: Promise<any> = Promise.resolve();

  shouldComponentUpdate(nextProps: Readonly<Props>) {
    if (nextProps.onTimerTick !== this.props.onTimerTick) {
      this.initialPromise = this.onRefresh();
    }
    if (nextProps.disableDatePicker !== this.props.disableDatePicker) {
      this.setEmptyTimefilterParams(nextProps.disableDatePicker);
      return false;
    }
    return true;
  }

  componentDidMount() {
    const { timefilterParams, setTimefilterParams } = this.context;
    setTimefilterParams(timefilterParams);
    this.initialPromise = this.onRefresh();
  }

  onTimeChange = ({ start, end }: TimeRange) => {
    this.setState((prevState: State) => {
      let recentlyUsedRanges = prevState.recentlyUsedRanges.filter((range: TimeRange) => {
        return range.start !== start || range.end !== end;
      });

      recentlyUsedRanges.unshift({ start, end });
      recentlyUsedRanges = recentlyUsedRanges.slice(0, MAX_RECENT - 1);

      return { recentlyUsedRanges, loading: true };
    }, () => this.context.setTimefilterParams({ start, end }));
  };

  onRefresh = ({ start, end }: TimeRange = this.context.timefilterParams): Promise<any> => {
    return this.initialPromise.then(() => {
      return this.props.onTimerTick && this.props.onTimerTick({ start, end });
    }).then(() => {
      this.setLoading(false);
      return Promise.resolve();
    });
  };

  setLoading = (loading: boolean) => {
    if (this.state.loading !== loading) {
      this.setState({ loading });
    }
  };

  onRefreshChange = ({ isPaused, refreshInterval }: Partial<TimefilterParams>) => {
    const { setTimefilterParams } = this.context;
    const newTimefilterParams = { isPaused, refreshInterval };
    setTimefilterParams(newTimefilterParams);
  };

  private setEmptyTimefilterParams = (empty: boolean = true) => {
    const { setTimefilterParams, timefilterParams } = this.context;
    if (!empty) {
      setTimefilterParams(this.currentTimefilterParams);
    } else if (Object.keys(timefilterParams).length && empty) {
      const emptyTimefilter = { refreshInterval: null, isPaused: null, start: null, end: null };
      setTimefilterParams(emptyTimefilter);
    }
  }

  private DatePicker: React.FC = () => {

    if (this.props.disableDatePicker) {
      return null;
    }

    const { timefilterParams } = this.context;
    this.currentTimefilterParams = { ...timefilterParams };

    return (
      <EuiFlexItem style={{ minWidth: 300 }}>
        <EuiSuperDatePicker
          isLoading={this.state.loading}
          onTimeChange={this.onTimeChange}
          onRefresh={this.onRefresh}
          onRefreshChange={this.onRefreshChange}
          recentlyUsedRanges={this.state.recentlyUsedRanges}
          {...timefilterParams}
        />
      </EuiFlexItem>
    );
  }

  render() {
    return (
      <EuiFlexGroup wrap>
        <EuiFlexItem>
          <Title text={this.props.title} />
        </EuiFlexItem>
        <this.DatePicker />
        <EuiSpacer />
      </EuiFlexGroup>
    );
  }
}
