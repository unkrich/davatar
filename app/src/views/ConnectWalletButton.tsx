import Davatar from '@davatar/react';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useCallback } from 'react';

import { useENS } from '../ENSProvider';
import { useWallet } from '../WalletProvider';
import { sliceWalletAddress, VIEW_STEPS } from '../constants';
import useUser from '../useUser';
import Button from './Button';

export default function ConnectWalletButton() {
  // eslint-disable-next-line
  const navigation: any = useNavigation();
  const { address, loadingWallet } = useWallet();
  const { user, loading: loadingUser } = useUser();
  const { name, loading: loadingENS } = useENS();

  const onPress = useCallback(() => {
    navigation.navigate(VIEW_STEPS.CONNECT_WALLET_MODAL);
  }, [navigation]);

  if (!address || !user || loadingWallet || loadingENS || loadingUser) return null;

  // TODO : ELLIPSIS WHE
  const slicedAddress = sliceWalletAddress(address);

  return (
    <Button
      title={name || slicedAddress}
      onPress={onPress}
      preTextComponent={<Davatar size={20} style={{ marginRight: 8 }} address={address} />}
    />
  );
}
