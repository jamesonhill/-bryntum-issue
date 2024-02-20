import './App.css';
import { useState, useRef, useMemo, useEffect } from 'react';
import '@bryntum/gantt/gantt.stockholm.css';
import { BryntumGantt } from '@bryntum/gantt-react';

const DateDisplay = ({ date }) => {
  return <span>{date.toDateString()}</span>
}

function BryntumComponent({ data }) {
  const ganttRef = useRef(null);

  const tasksRef = useRef();

  const tasks = useMemo(() => {
    return data.map((task) => {
      return {
        ...task,
        startDate: task.start,
        endDate: task.due,
        manuallyScheduled: true
      };
    });
  }, [data]);

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
    projectLinesFeature: { showCurrentTimeline: true },
    subGridConfigs: { locked: { width: '40%' } },
  })

  const [columns] = useState([
    {
      type: 'name',
      field: 'name',
      id: 'name',
      autoHeight: true,
      width: 100,
      renderer: (args) => {
        if (args.record.getData('start')) {
          args.row.addCls('myRow');
        }
        return <div>{args.value}</div>;
      },
      sortable: false,
      leafIconCls: null
    },
    {
      field: 'start',
      id: 'start',
      text: 'Start Date',
      type: 'date',
      width: 100,
      renderer: ({ record }) => {
        // console.log('start date: ', (args.record.toJSON() as any).name, {
        //   value: args.value,
        //   id: getProperty(args.record, 'id'),
        //   start: getProperty(args.record, 'start')
        // });
  
        const date = record.getData('startDate');
  
        if (!date) {
          return '';
        }
  
        return <DateDisplay date={date} />;
      }
    },
  ]);


  useEffect(() => {
    if (ganttRef.current && tasksRef.current !== tasks) {
      ganttRef.current.instance.taskStore.data = tasks;
      tasksRef.current = tasks;
    }
  }, [tasks]);

  // const tasks = useMemo(() => {
  //   return data;
  // }, [data]);

  // console.log(ganttRef.current?.instance.timeAxis)

  return (
      <div style={{ height: 500}}>
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
        />
      </div>
  );
}

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setData(Array.from({ length: 100 }, (_, i) => ({ id: i, name: `task ${i === 0 ? i : ''}`,  start: i === 0 ? new Date(2024, 0, 1) : '', due: i === 0 ? new Date(2024,11, 30) : ''})));
    }

    loadData();
  }, [])

  return (
    <div>
      <BryntumComponent data={data} />
      {/* <button onClick={() => {
          setData(prev => {
            const newData = [...prev];

            if (newData[0].custom === null) {
              newData[0].custom = 'my custom thing';
            } else {
              newData[0].custom = null;
            }

            return newData;
          });
        }}>Toggle custom field value to {data[0].custom === null ? 'not null' : 'null'}</button> */}
    </div>
  );
}

export default App;
