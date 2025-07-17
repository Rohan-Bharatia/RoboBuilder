import { Switch, Route } from 'wouter';
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';
import { Home } from '@/pages/home';
import './App.css'

function App() {
    return (
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <div className="min-h-screen bg-background">
                <header className="border-b">
                    <div className="container mx-auto px-4 py-4 flex justify between items-center">
                        <h1 className="text-2xl font-bold text-foreground">
                            RoboBuilder by FRC 4750
                        </h1>
                        <ThemeToggle />
                    </div>
                </header>
                <main>
                    <Switch>
                        <Route path="/" component={Home} />
                        {/*
                        <Route path="wizard/" component={Wizard} />
                        <Route path="download/" component={Download} />
                        */}
                    </Switch>
                </main>
                <footer>
                    <br />
                </footer>
            </div>
        </ThemeProvider>
    );
}

export default App;
