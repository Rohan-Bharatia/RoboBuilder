import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TriangleAlert } from 'lucide-react';
import { useLocation } from 'wouter';

export function Unknown() {
    const [, navigate] = useLocation();

    const handleTravel = () => {
        console.log('Going home...');
        navigate('/');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <TriangleAlert className="h-5 w-5" />
                        Error 404
                    </CardTitle>
                    <CardDescription>
                        The page you were looking for doesn't exist
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <Button onClick={handleTravel} className="w-full" size="lg">
                            Go Home
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
