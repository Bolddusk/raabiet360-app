import type React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { useTheme } from '@providers';
import { FilterCardProps } from '@types';
import Dropdown from '../../Dropdown/Dropdown';
import { styles } from './FilterCard.styles';

const FilterCard: React.FC<FilterCardProps> = ({
  filterData,
  statusOptions,
  selectedFilter,
  setSelectedFilter,
}) => {
  const { THEME_COLOR } = useTheme();
  const Styles = styles({ THEME_COLOR });
  const { t } = useTranslation();

  // Use statusOptions if available, otherwise fall back to filterData
  const filterItems = statusOptions || filterData || [];

  const translatedFilterItems = filterItems.map(item => ({
    ...item,
    label: item.label, // Keep the original label
  }));

  return (
    <View style={Styles.container}>
      <View style={Styles.filterRow}>
        <View style={Styles.filterItem}>
          <Text style={Styles.filterLabel}>{t('Label.Status')}</Text>
          <View style={Styles.dropdownWrapper}>
            <Dropdown
              showLabel={false}
              data={translatedFilterItems}
              value={selectedFilter}
              onChange={item => {
                setSelectedFilter(item.value);
              }}
              dContainerStyle={Styles.dropdownContainer}
              dTextStyle={Styles.dropdownText}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default FilterCard;
