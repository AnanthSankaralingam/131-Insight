import { GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center justify-center space-y-8">
        <GraduationCap className="h-16 w-16 text-primary" />
        <h1 className="text-4xl font-bold text-center">TA Feedback System</h1>
        <p className="text-xl text-muted-foreground text-center max-w-2xl">
          Streamline communication between Teaching Assistants and Professors
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mt-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="flex flex-col items-center p-8">
              <h2 className="text-2xl font-semibold mb-4">Teaching Assistants</h2>
              <p className="text-center text-muted-foreground mb-6">
                Submit feedback about your class sessions
              </p>
              <Link href="/ta/feedback">
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Submit Feedback
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="flex flex-col items-center p-8">
              <h2 className="text-2xl font-semibold mb-4">Professors</h2>
              <p className="text-center text-muted-foreground mb-6">
                View and analyze TA feedback data
              </p>
              <Link href="/professor/dashboard">
                <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                  View Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}