import './App.css';
import { useState, useRef, useMemo, useEffect } from 'react';
import '@bryntum/gantt/gantt.stockholm.css';
import { BryntumGantt } from '@bryntum/gantt-react';

function BryntumComponent({ data: propData }) {
  const ganttRef = useRef(null);

  const [data, setData] = useState([]);

  useEffect(() => {
    const waitForDataLoad = async () => {
      await new Promise(resolve => {
        setTimeout(() => {
          setData(propData);
          resolve();
        }, 0)
      })
    }

    waitForDataLoad();
  }, [propData]);

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
    // autoAdjustTimeAxis: false,
    projectLinesFeature: { showCurrentTimeLine: true },
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
        if (!args.value) {
          return null;
        }
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

  // const tasks = useMemo(() => {
  //   return data;
  // }, [data]);

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
          project={{ tasks: data }} 
          // projectLinesFeature={false}
          {...config}
          listeners={{
            renderRow: (args) => console.log('renderRow', args.recordIndex),
            renderRows: () => console.log('renderRows'),
            rowMouseEnter: () => console.log('mouse enter')
          }}
        />
      </div>
  );
}

function App() {
  const [data, setData] = useState([{ id: 1, name: 'task 1', custom: null, startDate: new Date(2024, 0, 1), endDate: new Date(2024,11, 30)}]);

  return (
    <div>
      <BryntumComponent data={data} />
      <button onClick={() => {
          setData(prev => {
            const newData = [...prev];

            if (newData[0].custom === null) {
              newData[0].custom = 'my custom thing';
            } else {
              newData[0].custom = null;
            }

            return newData;
          });
        }}>Toggle custom field value to {data[0].custom === null ? 'not null' : 'null'}</button>
    </div>
  );
}

export default App;
