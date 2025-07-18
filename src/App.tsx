import { Switch, Route } from 'wouter';
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';
import { Home } from '@/pages/home';
import { Wizard } from '@/pages/wizard';
import { Finish } from '@/pages/finish';
import { Unknown } from '@/pages/unknown';
import './App.css'

function App() {
    return (
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <div className="min-h-screen bg-background">
                <header className="border-b p-4">
                    <div className="container mx-auto px-4 py-4 flex justify between items-center gap-4">
                        <a href="/" className="cursor-default">
                            <h1 className="text-2xl font-bold text-foreground">
                                RoboBuilder by FRC 4750
                            </h1>
                        </a>
                        <ThemeToggle />
                    </div>
                </header>
                <main className="p-4">
                    <Switch>
                        <Route path="/" component={Home} />
                        <Route path="wizard/" component={Wizard} />
                        <Route path="finish/" component={Finish} />
                        <Route component={Unknown} />
                    </Switch>
                </main>
                <footer className="border-b p-4">
                </footer>
            </div>
        </ThemeProvider>
    );
}

export default App;
