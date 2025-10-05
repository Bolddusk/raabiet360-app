import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@providers';
import { styles } from './ItemQuantityTable.styles';

const ItemQuantityTable = ({ items, handleUpdateQty }: any) => {
  const { THEME_COLOR } = useTheme();
  const { t } = useTranslation();
  const Styles = styles({ THEME_COLOR });

  return (
    <View style={Styles.tableContainer}>
      <View style={Styles.tableRow}>
        <Text style={[Styles.tableHeaderCell, Styles.headerName]}>
          {t('Label.ItemName')}
        </Text>
        <View style={Styles.verticalDivider} />
        <Text style={[Styles.tableHeaderCell, Styles.headerCode]}>
          {t('Label.ItemCode')}
        </Text>
        <View style={Styles.verticalDivider} />
        <Text style={[Styles.tableHeaderCell, Styles.headerQty]}>
          {t('Label.Qty')}
        </Text>
      </View>

      {items?.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <View
            key={item?.code}
            style={[Styles.tableRow, isLast && { borderBottomWidth: 0 }]}>
            <Text style={[Styles.tableCell, Styles.cellName]}>
              {item?.name}
            </Text>
            <View style={Styles.verticalDivider} />
            <Text style={[Styles.tableCell, Styles.cellCode]}>
              {item?.code}
            </Text>
            <View style={Styles.verticalDivider} />
            <TextInput
              value={item?.quantity?.toString() ?? ''}
              keyboardType="numeric"
              onChangeText={text => handleUpdateQty(item?.code, text)}
              style={[Styles.quantityInput, Styles.cellQty]}
            />
          </View>
        );
      })}
    </View>
  );
};

export default ItemQuantityTable;
