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
    subGridConfigs: { locked: { width: '40%' } },
    autoAdjustTimeAxis: false,
    fixedRowHeight: false,
    cellEditFeature: false,
    cellMenuFeature: false,
    columnReorderFeature: false,
    taskMenuFeature: false,
    taskEditFeature: false,
    rowReorderFeature: false,
    columnLines: false,
    projectLinesFeature: false,
    headerMenuFeature: false,
    zoomOnTimeAxisDoubleClick: false,
    zoomOnMouseWheel: false,
    dependenciesFeature: { allowCreate: false },
    sortFeature: false
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
        } else {
          args.row.removeCls('myRow');
        }
        return <div>{args.value}</div>;
      },
      sortable: false,
      leafIconCls: null,
      htmlEncode: false
    },
    {
      field: 'start',
      id: 'start',
      text: 'Start Date',
      type: 'date',
      width: 100,
      htmlEncode: false,
      renderer: ({ record, value }) => {
  
        // const date = record.getData('start');
  
        if (!value) {
          return '';
        }
  
        return <DateDisplay date={value} />;
      }
    },
    {
      field: 'due',
      id: 'due',
      text: 'Due Date',
      type: 'date',
      width: 100,
      htmlEncode: false,
      renderer: ({ record, value }) => {
  
        // const date = record.getData('start');
  
        if (!value) {
          return '';
        }
  
        return <DateDisplay date={value} />;
      }
    },
  ]);


  useEffect(() => {
    if (ganttRef.current && tasksRef.current !== tasks) {
      ganttRef.current.instance.taskStore.data = tasks;
      tasksRef.current = tasks;
    }
  }, [tasks]);

  return (
      <div style={{ height: '100%', flex: 1, border: '1px solid black' }}>
        <BryntumGantt 
          ref={ganttRef}
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

  console.log('data', data);

  return (
    <div style={{ height: '100%', display: 'flex', padding: 10}}>
      <BryntumComponent data={data} />
    </div>
  );
}

export default App;
