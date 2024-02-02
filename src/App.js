import './App.css';
import { useState, useRef, useMemo, useEffect } from 'react';
import '@bryntum/gantt/gantt.stockholm.css';
import { BryntumGantt } from '@bryntum/gantt-react';

function BryntumComponent({ data }) {
  const ganttRef = useRef(null);

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

  const tasks = useMemo(() => {
    return data;
  }, [data]);

  console.log({ data, tasks })

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
          viewPreset={{
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
          }}
        />
        <button onClick={() => {
          if (ganttRef.current) {
            ganttRef.current.instance.setTimeSpan(new Date(2021, 5, 15), new Date(2021,9, 30));
          }
        }}>Set Timespan to minDate</button>
      </div>
  );
}

function App() {
  const [data, setData] = useState([{ id: 1, name: 'task 1', custom: 'my custom thing', startDate: new Date(2021, 5, 15), endDate: new Date(2021,8, 30)}]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log('in timer func');
  //     setData((prev) => [{  id: 1, name: prev[0].name + '1', custom: prev[0].custom + '1' }]);
  //   }, 2000);

  //   return () => {
  //     clearInterval(interval);
  //   }
  // }, []);

  return (
    <div>
      <BryntumComponent data={data} />
    </div>
  );
}

export default App;
