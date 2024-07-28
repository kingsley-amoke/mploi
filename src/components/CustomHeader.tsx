import { Feather } from '@expo/vector-icons';
import * as React from 'react';
import { Appbar } from 'react-native-paper';
import useTheme from '../hooks/useTheme';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';

const CustomHeader = ({title}: {title: string}) => {

  const router = useRouter();

  const {colorScheme} = useTheme();

  const color = colorScheme === 'dark' ? 'white' : 'black';

  // const _goBack = () => console.log('Went back');

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => console.log('Shown more');

  return (
    <Appbar.Header>
      
      <Appbar.Content title={title} />
      <Appbar.Action icon="magnify" onPress={_handleSearch} />
      <Feather name='user' color={color} size={24} onPress={() => router.push('/profile')}/>
    </Appbar.Header>
  );
};

export default CustomHeader;