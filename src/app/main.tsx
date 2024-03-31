import ReactDOM from 'react-dom/client';
import Provider from "./providers/providers.tsx";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider />,
);