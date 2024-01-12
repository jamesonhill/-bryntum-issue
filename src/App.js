import './App.css';
import { useState } from 'react';
import '@bryntum/gantt/gantt.stockholm.css';
import { BryntumGantt } from '@bryntum/gantt-react';

function App() {
  const [config] = useState(() => ({
    columns: [
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
    ]
  }))

  return (
      <div>
        <BryntumGantt {...config} project={{ tasks: [{ id: '1', name: 'Hello here is a really long name that I want to wrap text with less width', startDate: new Date(), endDate: new Date()}] }} projectLinesFeature={false} />
      </div>
  );
}

export default App;
