import React from 'react';
import { Text, View } from 'react-native';

import { useTheme } from '@providers';
import { EmptyListProps } from '@types';
import { styles } from './EmptyList.styles';

const EmptyList = (props: EmptyListProps) => {
  const { icon, text } = props;
  const { THEME_COLOR } = useTheme();

  const Styles = styles({ THEME_COLOR });

  return (
    <View style={Styles.listContainer}>
      {icon}
      <Text style={Styles.listText}>{text}</Text>
    </View>
  );
};

export default EmptyList;
