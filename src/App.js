import './App.css';
import '@bryntum/gantt/gantt.stockholm.css';
import { BryntumGantt } from '@bryntum/gantt-react';

function App() {
  const config = {
    columns: [
      {
        type: 'name',
        field: 'name',
        renderer: (args) => {
          console.log('yo');
          return <div>{args.value}</div>;
        },
        sortable: false
      }
    ]
  };

  return (
      <div>
        <BryntumGantt {...config} project={{ tasks: [{ id: '1', name: 'Hello', startDate: new Date(), endDate: new Date()}] }} projectLinesFeature={false} />
      </div>
  );
}

export default App;
