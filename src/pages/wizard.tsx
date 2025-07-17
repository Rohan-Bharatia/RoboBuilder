import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { useLocation } from 'wouter';
import { useConfig, writeFile } from '@/components/config-file';

interface WizardStep {
    title: string;
    description: string;
    fields: Array<{
        key: string;
        label: string;
        type: 'text' | 'number' | 'select';
        options?: string[];
        required?: boolean;
    }>;
};

const wizardSteps: WizardStep[] = [
    {
        title: 'Team Information',
        description: 'Basic information about your team and robot',
        fields: [
            { key: 'teamNumber', label: 'Team Number', type: 'number', required: true, },
            { key: 'teamName', label: 'Team Name', type: 'text', required: true, },
            { key: 'robotName', label: 'Robot Name', type: 'text', required: true, },
        ],
    },
    {
        title: 'Hardware Configuration',
        description: 'Configure your robot hardware',
        fields: [
            { key: 'roboRIOVersion', label: 'RoboRIO Version', type: 'select', options: ['1', '2'], required: true, },
            { key: 'drivetrainType', label: 'Drivetrain Type', type: 'select', options: ['tank', 'Swerve', 'Mechanum'], required: true, },
        ],
    },
    {
        title: 'Programming Preferences',
        description: 'Configure code generation preferences',
        fields: [
            { key: 'language', label: 'Programming Language', type: 'select', options: ['Java', 'C++', 'Python'], required: true, },
            { key: 'framework', label: 'Framework', type: 'select', options: ['Command-Based', 'Timed Robot', 'Sample Robot'], required: true, },
        ],
    },
];

export function Wizard() {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [, navigate] = useLocation();
    const config = useConfig();

    const progress = ((currentStep + 1) / wizardSteps.length) * 100;

    const handleInputChange = (key: string, value: any) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handlePrevious = () => {
        if (currentStep > 0)
            setCurrentStep(currentStep - 1);
    }

    const handleNext = () => {
        const currentStepData = wizardSteps[currentStep];
        const requiredFields = currentStepData.fields.filter(field => field.required);

        const missingFields = requiredFields.filter(field => !formData[field.key] || formData[field.key] === '');

        if (missingFields.length > 0) {
            console.error(`Please fill in all required fields: ${missingFields.map(f => f.label).join(', ')}`);
            return;
        }

        if (currentStep < wizardSteps.length - 1)
            setCurrentStep(currentStep + 1);
        else
            handleFinish();
    };

    const handleFinish = () => {
        Object.entries(formData).forEach(([key, value]) => {
            writeFile(key, value);
        });

        console.log('Configuration wizard completed');
        navigate('/finish/');
    };

    const currentStepData = wizardSteps[currentStep];

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                    Configuration Wizard
                </h1>
                <p className="text-muted-foreground mb-4">
                    Step {currentStep + 1} of {wizardSteps.length}
                </p>
                <Progress value={progress} className="w-full"/>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        {currentStep === wizardSteps.length - 1 ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-sm">
                                {currentStep + 1}
                            </span>
                        )}
                        {currentStepData.title}
                    </CardTitle>
                    <CardDescription>
                        {currentStepData.description}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {currentStepData.fields.map((field) => (
                            <div key={field.key} className="space-y-2">
                                <Label htmlFor={field.key}>
                                    {field.label}
                                    {field.required && <span className="text-destructive ml-1">*</span>}
                                </Label>
                                {field.type === 'select' ? (
                                    <Select value={formData[field.key] || ''} onValueChange={(value) => handleInputChange(field.key, value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder={`Select ${field.label}`} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {field.options?.map((option) => (
                                                <SelectItem key={option} value={option}>
                                                    {option}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                ) : (
                                    <Input id={field.key} type={field.type} value={formData[field.key] || ''} onChange={(e) => handleInputChange(field.key, e.target.value)} placeholder={`Enter ${field.label.toLowerCase()}`} />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-8">
                        <Button onClick={handlePrevious} disabled={currentStep === 0} variant="outline" className="flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Previous
                        </Button>
                        <Button onClick={handleNext} className="flex items-center gap-2">
                            {currentStep === wizardSteps.length - 1 ? 'Finish' : 'Next'}
                            {currentStep < wizardSteps.length - 1 && <ArrowRight className="h-4 w-4" />}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}


