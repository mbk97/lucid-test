import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import InputComponent from "./components/InputComponent";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <InputComponent />
    </QueryClientProvider>
  );
}

export default App;
