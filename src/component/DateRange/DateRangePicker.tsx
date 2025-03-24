import { useState } from 'react';
import { DateRange } from 'react-date-range';
import { enGB } from 'date-fns/locale';
import { addYears } from 'date-fns';

type DateRangePickerProps = {
  onDateSelect: (startDate: Date, endDate: Date) => void;
  close: () => void;
};

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onDateSelect, close }) => {
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate:  addYears(new Date(), 1),
    key: 'selection',
  });

  const handleSelect = (ranges: any) => {
    setSelectionRange(ranges.selection);
  };

  const handleApply = () => {
    onDateSelect(selectionRange.startDate, selectionRange.endDate);
    close()
  };

  return (
    <div style={styles.container}>
      <DateRange
        ranges={[selectionRange]}
        onChange={handleSelect}
        locale={enGB}
        className='PreviewArea'
        showMonthAndYearPickers={false}
        moveRangeOnFirstSelection={false}
        retainEndDateOnFirstSelection={false}
        rangeColors={['#7BA35A']}
        color="#7BA35A"

      />
      <button style={styles.applyButton} onClick={handleApply}>
        Apply
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: '10px 2px',
    backgroundColor: '#F9F9F9',
    borderRadius: '15px',
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
    width: '340px',
    // boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    border: '1px solid #4D382D',
    fontFamily: 'Arial, sans-serif',
  },
  applyButton: {
    backgroundColor: '#4D382D',
    color: '#FFF',
    padding: '12px',
    borderRadius: '20px',
    border: 'none',
    width: '100%',
    marginTop: '10px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background 0.3s ease',
  },
};

export default DateRangePicker;
