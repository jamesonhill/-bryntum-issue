import './App.css';
import { useState, useRef, useEffect } from 'react';
import '@bryntum/gantt/gantt.stockholm.css';
import { BryntumGantt } from '@bryntum/gantt-react';

function BryntumComponent() {
  const ganttRef = useRef(null);

  const [columns] = useState([
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

  return (
      <div>
        <BryntumGantt 
          ref={ganttRef}
          getRowHeight={(args) => {
          console.log('getRowHeight', args);
          return 100;
        }} 
          columns={columns}
          project={{ tasks: [{ id: '1', name: 'Hello here is a really long name that I want to wrap text with less width'.repeat(10), startDate: new Date(), endDate: new Date()}] }} 
          projectLinesFeature={false} 
        />
        <button onClick={() => console.log('instance', ganttRef.current.instance)}>Print instance</button>
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
    </div>
  );
}

export default App;
