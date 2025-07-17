import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Settings, Zap, Code, Wrench } from 'lucide-react';
import { useLocation } from 'wouter';

export function Home() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [, navigate] = useLocation();

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.name.endsWith('.rbtconf'))
            setSelectedFile(file);
        else
            console.error('An invalid file was selected');
    };

    const handleCreateConfig = () => {
        console.log('Starting config wizard...');
        navigate('wizard/');
    };

    const handleUploadConfig = () => {
        if (selectedFile) {
            console.log(`Uploading config file ${selectedFile.name}`);
            navigate('download/');
        }
        else
           console.error('An invalid file was selected');
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-foreground mb-4">
                    Welcome to RoboBuilder
                </h1>
                <p className="text-xl text-muted-foreground mb-2">
                    A powerful yet intuitive tool for FIRST Robotics teams
                </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Settings className="h-5 w-5" />
                            Create New Configuration
                        </CardTitle>
                        <CardDescription>
                            Start from scrach with our guidedsetup wizard
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <Wrench className="h-4 w-4" />
                                <span>
                                    Configure robot subsystems
                                </span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <Code className="h-4 w-4" />
                                <span>
                                    Generate optimized code
                                </span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <Zap className="h-4 w-4" />
                                <span>
                                    Match-ready in minutes
                                </span>
                            </div>
                            <Button onClick={handleCreateConfig} className="w-full" size="lg">
                                Start Configuration Wizard
                            </Button>
                        </div>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-lg transision-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            Upload Existing Configuration
                        </CardTitle>
                        <CardDescription>
                            Import your existing .rbtconf file
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <Label htmlFor="config-file">
                                Select Configuration File
                            </Label>
                            <Input id="config-file" type="file" accept=".rbtconf" onChange={handleFileUpload} className="mt-1" />
                        </div>
                        {selectedFile && (
                            <div className="p-3 bg-muted rounded-md">
                                <p className="text-sm text-muted-foreground">
                                    Selected file:
                                </p>
                                <p className="font-medium">
                                    {selectedFile.name}
                                </p>
                            </div>
                        )}
                        <Button onClick={handleUploadConfig} disabled={!selectedFile} className="w-full" size="lg" variant={selectedFile ? "default" : "secondary"}>
                            {selectedFile ? "Upload & Continue" : "Select a file first"}
                        </Button>
                    </CardContent>
                </Card>
            </div>
            <div className="mt-16 text-center">
                <h2 className="text-2xl font-semibold mb-4">
                    Why RoboBuilder?
                </h2>
                <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                    <div className="text-center">
                        <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Zap className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold mb-2">
                            Fast Development
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Generate complete robot code in minutes instead of days or weeks
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Code className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold mb-2">
                            Clean Code
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Best practices and optimized patterns built-in
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Wrench className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold mb-2">
                            Customizable
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Tailor every aspect to your team's specific needs
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
