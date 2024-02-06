import './App.css';
import { useState, useRef, useMemo, useEffect } from 'react';
import '@bryntum/gantt/gantt.stockholm.css';
import { BryntumGantt } from '@bryntum/gantt-react';

function BryntumComponent({ data }) {
  const ganttRef = useRef(null);

  const [config] = useState({
    viewPreset: {
      timeResolution: { unit: 'day', increment: 1 },
      headers: [
        { unit: 'year', dateFormat: 'YYYY' },
        {
          unit: 'quarter',
          dateFormat: 'Q',
          renderer: (date, __, { value }) => {
            return `Q${value} ${date.getFullYear()}`;
          }
        },
        {
          unit: 'month',
          dateFormat: 'MMM'
        }
      ]
    },
    autoAdjustTimeAxis: false
  })

  const [columns] = useState([
    {
      type: 'name',
      field: 'name',
      id: 'name',
      autoHeight: true,
      width: 100,
      renderer: (args) => {
        return <div>{args.value}</div>;
      },
      sortable: false,
      leafIconCls: null
    },
    {
      field: 'custom',
      text: 'Custom column',
      width: 200,
      renderer: (args) => {
        return <div style={{ color: 'green'}}>{args.value}</div>;
      } 
    }
  ]);

  // this doesn't work; 
  useEffect(() => {
    if (ganttRef.current) {
      console.log('setting timespan first', ganttRef.current.instance)
      ganttRef.current.instance.setTimeSpan(new Date(2021,2, 25), new Date(2021,11, 3));

    }
  }, [ganttRef.current?.instance])

  const tasks = useMemo(() => {
    return data;
  }, [data]);

  console.log(ganttRef.current?.instance.timeAxis)

  return (
      <div>
        <BryntumGantt 
          ref={ganttRef}
          getRowHeight={(args) => {
          console.log('getRowHeight', args);
          return 100;
        }} 
          columns={columns}
          project={{ tasks }} 
          projectLinesFeature={false}
          {...config}
        />
        <button onClick={() => {
          if (ganttRef.current) {
            ganttRef.current.instance.timeAxis.setTimeSpan(new Date(2021,2, 25), new Date(2021,11, 3));
            // ganttRef.current.instance.setEndDate()
          }
        }}>Set Timespan to minDate</button>
      </div>
  );
}

function App() {
  const [data] = useState([{ id: 1, name: 'task 1', custom: 'my custom thing', startDate: new Date(2021, 5, 15), endDate: new Date(2021,8, 30)}]);

  return (
    <div>
      <BryntumComponent data={data} />
    </div>
  );
}

export default App;
