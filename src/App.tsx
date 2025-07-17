import { Switch, Route } from 'wouter';
import { ThemeProvider } from '@/components/theme-provider';
import './App.css'

function App() {
    return (
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <Switch>
            </Switch>
        </ThemeProvider>
    );
}

export default App;
