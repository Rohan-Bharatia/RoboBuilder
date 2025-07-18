import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/componenst/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Download, FileText, Settings, ArrowLeft } from 'lucide-react';
import { useLocation } from 'wouter';
import { useConfig, exportFile } from '@/components/config-file';

interface CodeFile {
    name: string;
    path: string;
    content: string;
    language: string;
};

export function Finish() {
    const [generatedFiles, setGeneratedFiles] = useState<CodeFile[]>([]);
    const [selectedFile, setSelectedFile] = useState<string>('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [, navigate] = useLocation();
    const config = useConfig();

    useEffect(() => {
        if (config)
            generateCode();
    }, [config]);

    const generateCode = async () => {
        if (!config)
            return;

        setIsGenerating(true);

        const files: CodeFiles[] = [];

        // TODO: Implement file creations
        switch (config.language) {
            case 'Java':
                break;
            case 'C++':
                break;
            case 'Python':
                break;
            default:
                break;
        }
        if (config.drivetrainType) {
        }

        setGeneratedFiles(files);
        setSelectedFile(files[0]?.name || '');
        setIsGenerating(false);
    };

    const getFileExtension = (language: string) => {
        switch (language) {
            case 'Java':   return 'java';
            case 'C++':    return 'cpp';
            case 'Python': return 'py';
            default:       return 'java';
        }
    };

    const handleDownloadZip = () => {
        // TODO: Use JSZip to create a zip file for the project
        console.log('Downloaded robot code');
    };

    const handleDownloadConfig = () => {
        exportFile(`${config.robotName || robot}.rbtconf`);
    };

    const selectedFileContent = generatedFiles.find(f => f.name === selectedFile);

    if (!config) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            No Configuration Found
                        </CardTitle>
                        <CardDescription>
                            Please complete the wizard setup or import a valid configuration file
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={() => navigate('/')} className="flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Go Home
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                        Robot Code Generated
                    </h1>
                    <p className="text-muted-foreground">
                        Review and download your {config.language} robot code for Team {config.teamNumber}
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button onClick={handleDownloadConfig} variant="outline" className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        Download Config
                    </Button>
                    <Button onClick={handleDownloadZip} variant="outline" className="flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Download Code
                    </Button>
                </div>
            </Card>
            <div className="grid lg:grid-cols-4 gap-6">
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <FileText className="h-4 w-4" />
                            Files
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-96">
                            <div className="space-y-1">
                                {generatedFiles.map((file) => (
                                    <Button key={file.name} onClick={() => setSelectedFile(file.name)} className={`w-full text-left px-2 py-1 rounded text-sm transition-colors ${selectedFile === file.name ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}>
                                        {file.name}
                                    </Button>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">
                            {selectedFileContent?.name || 'Select a file'}
                        </CardTitle>
                        <CardDescription>
                            {selectedFileContent?.path}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isGenerating ? (
                            <div className="flex items-center justify-center h-96">
                                <div className="text-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4">
                                    </div>
                                    <p className="text-muted-foreground">
                                        Generating code...
                                    </p>
                                </div>
                            </div>
                        ) : selectedFileContent ?(
                            <ScrollArea className="h-96 w-full rounded border">
                                <pre className="p-4 text-sm font-mono bg-muted/50">
                                    <code>
                                        {selectedFileContent.content}
                                    </code>
                                </pre>
                            </ScrollArea>
                        ) : (
                            <div className="flex items-center justify-center h-96 text-muted-foreground">
                                Select a file to view its contents
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>
                        Configuration Summary
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid md:cols-2 gap-4 text-sm">
                        <div>
                            <strong>
                                Team:{' '}
                            </strong>
                            {config.teamNumber} {config.teamName}
                        </div>
                        <div>
                            <strong>
                                Robot:{' '}
                            </strong>
                            {config.robotName}
                        </div>
                        <div>
                            <strong>
                                RoboRIO:{' '}
                            </strong>
                            {config.roboRIOVersion}
                        </div>
                        <div>
                            <strong>
                                Drivetrain:{' '}
                            </strong>
                            {config.drivetrainType}
                        </div>
                        <div>
                            <strong>
                                Odometry:{' '}
                            </strong>
                            {config.odomEncoderType !== null || config.odomIMUType !== null ? 'Yes' : 'No'}
                        </div>
                        {config.odomIMUType !== null ? (
                            <div>
                                <strong>
                                    IMU:{' '}
                                </strong>
                                {config.odomIMUType}
                            </div>
                        ) : null}
                        <div>
                            <strong>
                                Language:{' '}
                            </strong>
                            {config.language}
                        </div>
                        <div>
                            <strong>
                                Framework:{' '}
                            </strong>
                            {config.framework}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
