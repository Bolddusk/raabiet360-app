import React from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { DateTimeSelectorProps } from '@types';

const DateTimeSelector: React.FC<DateTimeSelectorProps> = ({
  isVisible,
  mode = 'datetime',
  onConfirm,
  onCancel,
}) => {
  return (
    <DateTimePickerModal
      isVisible={isVisible}
      mode={mode}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

export default DateTimeSelector;
