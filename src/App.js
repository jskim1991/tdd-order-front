import OrderListView from "./OrderListView";

function App() {
  return (
    <div className="App">
      <OrderListView orders={['order1', 'order2']} />
    </div>
  );
}

export default App;
