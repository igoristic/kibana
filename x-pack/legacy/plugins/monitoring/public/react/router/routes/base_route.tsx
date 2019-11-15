
import React from 'react';

import { useAppStateContext, AppStateContext } from '../../global_context';
import { PageLoading } from '../../components';


type State = {
  loading?: boolean
  data?: any[]
}

export class MonitoringViewBase extends React.Component<{}, State> {

  static contextType = AppStateContext;

  state: State = {
    loading: true
  }

  public setLoading = (loading: boolean) => {
    if (this.state.loading !== loading) {
      this.setState({ loading });
    }
  }

  public componentDidMount() {
    this.context.setTitle('');
  }

  public componentWillUnmount() {
    this.context.reset();
  }

  public renderView = (): never | JSX.Element | React.ComponentType => {
    throw Error('MonitoringViewBase > renderView must be implemented');
  }

  public render = () => ((this.state.loading) ? <PageLoading /> : this.renderView());

}