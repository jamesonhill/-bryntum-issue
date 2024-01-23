import './App.css';
import { useState, useRef, useEffect } from 'react';
import '@bryntum/gantt/gantt.stockholm.css';
import { BryntumGantt } from '@bryntum/gantt-react';

function BryntumComponent({ columns: propColumns }) {
  const ganttRef = useRef(null);

  useEffect(() => {
    if (propColumns) {
      if (!ganttRef.current) {
        console.log('no gantt ref');
        return;
      } 
        console.log('calling the store', propColumns);
        const columnStore = ganttRef.current.instance.columns;
        columnStore.removeAll();

        for (const column of propColumns) {
          columnStore.add(column);
        }
    }
  }, [propColumns]);
  console.log('columns', propColumns);

  return (
      <div>
        <BryntumGantt 
          ref={ganttRef}
          getRowHeight={(args) => {
          console.log('getRowHeight', args);
          return 100;
        }} 
          columns={propColumns}
          project={{ tasks: [{ id: '1', name: 'Hello here is a really long name that I want to wrap text with less width'.repeat(10), startDate: new Date(), endDate: new Date()}] }} 
          projectLinesFeature={false} 
        />
      </div>
  );
}

function App() {
  const [columns, setColumns] = useState([
    {
      type: 'name',
      field: 'name',
      autoHeight: true,
      width: 100,
      // renderer: (args) => {
      //   return <div>{args.value}</div>;
      // },
      sortable: false
    }
  ]);

  console.log('rendering App');
  return (
    <div>
      <BryntumComponent columns={columns} />
      <button onClick={() => {
        console.log('calling setColumns')
        setColumns(prev => [...prev, { type: 'name', field: 'name'}]);
      }}>Add new column</button>
    </div>
  );
}

export default App;
