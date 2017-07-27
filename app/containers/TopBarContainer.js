// @flow
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import TopBar from '../components/layout/TopBar';
import NodeSyncStatusIcon from '../components/widgets/NodeSyncStatusIcon';
import WalletTestEnvironmentLabel from '../components/widgets/WalletTestEnvironmentLabel';
import type { InjectedProps } from '../types/injectedPropsType';
import environment from '../environment';

@inject('stores', 'actions') @observer
export default class TopBarContainer extends Component {

  static defaultProps = { actions: null, stores: null };
  props: InjectedProps;

  render() {
    const { actions, stores } = this.props;
    const { sidebar, networkStatus, app } = stores;
    const isMainnet = environment.isMainnet();
    const testnetVersion = 0.5;
    const testnetLabel = (
      !isMainnet ? <WalletTestEnvironmentLabel version={testnetVersion} /> : null
    );

    return (
      <TopBar
        onToggleSidebar={actions.sidebar.toggleSubMenus.trigger}
        activeWallet={stores.wallets.active}
        currentRoute={app.currentRoute}
        showSubMenus={sidebar.isShowingSubMenus}
      >
        {testnetLabel}
        <NodeSyncStatusIcon
          networkStatus={networkStatus}
          isMainnet={isMainnet}
        />
      </TopBar>
    );
  }

}
